import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import displayVNDCurrency from "../helpers/displayVNDCurrency";
import { toast } from "react-toastify";
import Context from "../context";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCart,
  CreateOrder,
  setSubCreate,
} from "../store/createCart/CreateCartSlice";
import { Avatar, Button, Modal, notification, Space } from "antd";
import { CreateQR } from "../store/QRcode/CreateQR";
import { fetchDataBoughtUser } from "../store/bought/BoughtUser";
import { PaymentOrder } from "../store/thanhtoan/PaymentOrder";
import { DeleteCartAPI } from "../store/deleteCart/DeletecartSlice";

const Payment = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [cartData, setCartData] = useState([]);
  const context = useContext(Context);
  const [formSubmit, setFormSubmit] = useState({
    phone: "",
    address: "",
    productList: [],
  });
  const dataBought = useSelector((state) => state.bought.data);
  const subasd = useSelector((state) => state.statusCanceled.subCreateOrder);
  const [transactionStatus, setTransactionStatus] = useState("Đang xử lý...");
  const [intervalId, setIntervalId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOK = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const qr = useSelector((state) => state.createQR.data);
  const totalPrice = localStorage.getItem("totalPrice");
  
  const fetchData = async () => {
    const dataResponse = await fetch(SummaryApi.addProductToCartView.url, {
      method: SummaryApi.addProductToCartView.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    setCartData(dataApi.data);
  };

  const handlePaymentMethodChange = async (e) => {
    const value = e.target.value;
    console.log("Phương thức thanh toán:", value);

    setPaymentMethod(value);

    if (value === "bank-transfer") {
      const payload = {
        totalAmount: Number(totalPrice),
      };
      console.log("payload", payload);
      try {
        const result = await dispatch(CreateQR(payload)).unwrap();
        const transactionId = result?.transactionId;
        if (transactionId) {
          setShowQRCode(true);
          startTransactionCheck(transactionId); // Bắt đầu kiểm tra giao dịch
        } else {
          toast.error("Không tạo được mã QR. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Lỗi khi tạo QR:", error);
        toast.error("Đã xảy ra lỗi khi tạo mã QR.");
      }
    } else {
      setShowQRCode(false);
      clearTransactionCheck();
    }
  };

  const startTransactionCheck = (transactionId) => {
    clearTransactionCheck(); // Xóa interval cũ nếu tồn tại
    const id = setInterval(() => {
      checkTransactionStatus(transactionId);
    }, 10000); // Kiểm tra mỗi 5 giây
    setIntervalId(id);
  };

  const clearTransactionCheck = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
  };

  const checkTransactionStatus = async (transactionId) => {
    try {
      console.log("Kiểm tra trạng thái giao dịch với ID:", transactionId);
      setLoading(true);
      const response = await axios.get(
        `${SummaryApi.checkTransactionStatus.url}/${transactionId}`,
        {
          withCredentials: true,
        }
      );

      const  status  = response.data.data.status;
      console.log("Kết quả trả về từ API:", response.data.message);
      console.log(status);

      if (status === "Đã thanh toán") {
        setTransactionStatus("Đã thanh toán");
        clearTransactionCheck();
        toast.success("Thanh toán thành công!");
      } else if (status === "Đang xử lí") {
        setTransactionStatus("Đang xử lý...");

      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra giao dịch:", error);
      setTransactionStatus("Lỗi khi kiểm tra giao dịch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => clearTransactionCheck(); // Dọn dẹp interval khi component unmount
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    const data = [];
    cartData.forEach((item) =>
      data.push({
        productId: item.productId._id,
        quantity: item.quantity,
      })
    );

    setFormSubmit({
      phone: phone,
      address: address,
      productList: data,
    });
  }, [phone, address, cartData]);

  const [api, contextHolder] = notification.useNotification();

  // Hàm mở thông báo với tùy chọn pauseOnHover
  const openNotification = (pauseOnHover, color) => {
    api.open({
      message: <span className="text-black">{error}</span>,
      style: {
        border: `2px solid #FC9291`,
        backgroundColor: "#FEC9C4",
      },
      showProgress: true,
      pauseOnHover,
    });
  };

  const handleClick = () => {
    if (!phone || phone.trim().length === 0) {
      setError("Vui lòng nhập số điện thoại hợp lệ.");
      return openNotification(true, "red");
    }
    if (!address || address.trim().length === 0) {
      setError("Vui lòng nhập địa chỉ hợp lệ.");
      return openNotification(true, "red");
    }
    setError("");
    dispatch(CreateOrder(formSubmit));
  };

  useEffect(() => {
    if (subasd) {
      dispatch(fetchDataBoughtUser());
      dispatch(DeleteCartAPI())
      setOpen(true);
    }
  }, [subasd]);

  const handleClose = () => {
    setOpen(false);
    nav("/order");
  };

  const handleClickPay = () => {
    if (paymentMethod === 'cash-on-delivery') {
      dispatch(PaymentOrder(dataBought[dataBought.length - 1]._id))
      dispatch(setSubCreate(false))
      nav('/order')
      setOpen(false)
    } else {
      dispatch(setSubCreate(false));
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      {contextHolder}

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Thanh Toán</h1>
      </header>

      <h2 className="text-2xl font-semibold mb-4">Thông tin thanh toán</h2>

      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Số điện thoại
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nhập số điện thoại"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Địa chỉ:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Nhập địa chỉ"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <fieldset className="mb-6">
        <legend className="text-gray-700 text-sm font-semibold mb-2">
          Phương thức thanh toán:
        </legend>
      </fieldset>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Tóm tắt đơn hàng:</h3>
        {cartData.map((product) => (
          <div
            key={product.productId._id}
            className="flex justify-between mb-2"
          >
            <span className="text-gray-700">
              {product.productId.productName}: x{product.quantity}
            </span>
            <span className="text-gray-700">
              {displayVNDCurrency(
                product.productId.sellingPrice * product.quantity
              )}
            </span>
          </div>
        ))}
        <div className="flex justify-between mb-2 font-semibold">
          <span>Tổng cộng:</span>
          <span>{displayVNDCurrency(totalPrice)}</span>
        </div>
      </div>

      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        disabled={loading}
        onClick={handleClick}
      >
        {loading ? "Đang xử lý..." : "Đặt hàng"}
      </button>

      <Modal
        title={<div className="text-center">Chọn phương thức thanh toán</div>}
        open={open}
        onOk={handleOK}
        onCancel={handleCancel}
        footer={false}
        closable={false}
        centered
      >
        <div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="bank-transfer"
              name="payment-method"
              value="bank-transfer"
              checked={paymentMethod === "bank-transfer"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
              required
            />
            <label htmlFor="bank-transfer" className="text-gray-700">
              Chuyển khoản ngân hàng
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="cash-on-delivery"
              name="payment-method"
              value="cash-on-delivery"
              checked={paymentMethod === "cash-on-delivery"}
              onChange={handlePaymentMethodChange}
              className="mr-2"
              required
            />
            <label htmlFor="cash-on-delivery" className="text-gray-700">
              Thanh toán khi nhận hàng
            </label>
          </div>
          {showQRCode ? (
            <div className="text-center">
              <img src={qr.qrUrl} alt="" />
              <p className="mt-2 text-gray-700">
                Quét mã QR để thực hiện thanh toán chuyển khoản
              </p>
              <p className="text-green-600 font-semibold mt-2">
                {transactionStatus}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-end">
          <Space>
            <Button onClick={handleClose}>Đóng</Button>
            {paymentMethod === "cash-on-delivery" && (
              <Button type="primary" onClick={handleClickPay}>
                Xác nhận
              </Button>
            )}
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default Payment;
