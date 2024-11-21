import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { useNavigate } from "react-router-dom";
import displayVNDCurrency from "../helpers/displayVNDCurrency";
import { toast } from "react-toastify";
import Context from "../context";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { CreateCart, CreateOrder } from "../store/createCart/CreateCartSlice";
import { Button, Modal, notification } from "antd";

const Payment = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
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
    phone: '',
    address: '',
    productList: []
  })

  const [open, setOpen] = useState(false)

  const handleOK = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const navigate = useNavigate();
  const totalPrice = localStorage.getItem("totalPrice");
  console.log("totalPrice: ", totalPrice);

  const fetchData = async () => {
    const dataResponse = await fetch(SummaryApi.addProductToCartView.url, {
      method: SummaryApi.addProductToCartView.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    setCartData(dataApi.data);
    console.log(dataApi.data);
  };

  console.log('tesstData: ', formSubmit);

  // const deleteCountCart = async () => {
  //   const dataResponse = await fetch(SummaryApi.deleteAllProductInCart.url, {
  //     method: SummaryApi.deleteAllProductInCart.method,
  //     credentials: "include",
  //   });
  //   const dataApi = await dataResponse.json();
  // };

  const handlePaymentMethodChange = (e) => {
    const value = e.target.value;
    console.log('values', value);

    setPaymentMethod(value);

    if (value === "bank-transfer") {
      setShowQRCode(true);
    } else {
      setShowQRCode(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const dataResponse = await fetch(SummaryApi.checkPaymentQrCode.url, {
  //       method: SummaryApi.checkPaymentQrCode.method,
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         phone,
  //         address,
  //         paymentMethod,
  //         product: cartData.map((product) => ({
  //           productId: product.productId._id,
  //           quantity: product.quantity,
  //         })),
  //       }),
  //     });

  //     const dataApi = await dataResponse.json();
  //     console.log(dataApi);

  //     if (dataApi.success) {
  //       toast.success("Đặt hàng thành công!");
  //       setTimeout(
  //         () => {
  //           navigate("/notification");
  //           context.fetchUserAddToCart();
  //         },
  //         paymentMethod === "cash-on-delivery" ? 3000 : 7000
  //       );
  //       deleteCountCart();
  //     }
  //   } catch (err) {
  //     setError("Đã xảy ra lỗi kết nối.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    const data = []
    cartData.forEach(item => data.push(
      {
        productId: item.productId._id,
        quantity: item.quantity
      }))

    setFormSubmit({
      phone: phone,
      address: address,
      productList: data
    })
  }, [phone, address, cartData])


  const [api, contextHolder] = notification.useNotification();

  // Hàm mở thông báo với tùy chọn pauseOnHover
  const openNotification = (pauseOnHover, color) => {
    api.open({
      message: <span className="text-black">{error}</span>,
      // description: 'This is the content of the notification.',
      style: {
        border: `2px solid #FC9291`,
        backgroundColor: '#FEC9C4',
      },
      showProgress: true,
      pauseOnHover,
    });
  };

  const handleClick = () => {

    if (!phone || phone.trim().length === 0) {
      setError("Vui lòng nhập số điện thoại hợp lệ.");

      return openNotification(true, 'red');
    }
    if (!address || address.trim().length === 0) {
      setError("Vui lòng nhập địa chỉ hợp lệ.");
      return openNotification(true, 'red');
    }

    // Đặt lại error nếu tất cả đều hợp lệ
    setError("");

    dispatch(CreateCart(formSubmit))
    // if (paymentMethod === "bank-transfer") {
    //   setShowQRCode(true);
    // } else {
    //   setShowQRCode(false);
    // }
    setOpen(true)
  }

  console.log('formSubmit', formSubmit);


  const handleClose = () => {
    dispatch(CreateOrder(formSubmit))
    setOpen(false)
    nav('/order')
  }



  return (
    <div className="container mx-auto p-6 bg-gray-100">
      {contextHolder}

      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Thanh Toán</h1>
      </header>

      {/* <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
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
        </fieldset>

        {showQRCode && (
          <div className="mb-6 text-center">
            <img
              src="https://img.vietqr.io/image/TCB-19037144050012-compact.png"
              alt="QR Code"
              width="256"
              height="256"
              className="mx-auto"
            />
            <p className="mt-2 text-gray-700">
              Quét mã QR để thực hiện thanh toán chuyển khoản
            </p>
          </div>
        )}

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
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Đặt hàng"}
        </button>

        {success && <p className="text-green-500 mt-4">{success}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {orderStatus && <p className="text-blue-500 mt-4">{orderStatus}</p>}
      </form> */}

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

        {/* <div className="flex items-center mb-2">
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
        </div> */}
      </fieldset>

      {/* {showQRCode && (
        <div className="mb-6 text-center">
          <img
            src="https://img.vietqr.io/image/TCB-19037144050012-compact.png"
            alt="QR Code"
            width="256"
            height="256"
            className="mx-auto"
          />
          <p className="mt-2 text-gray-700">
            Quét mã QR để thực hiện thanh toán chuyển khoản
          </p>
        </div>
      )} */}

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

      {/* {success && <p className="text-green-500 mt-4">{success}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {orderStatus && <p className="text-blue-500 mt-4">{orderStatus}</p>} */}


      <Modal
        open={open}
        onOk={handleOK}
        onCancel={handleCancel}
        footer={false}
        closable={false}
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
            <div className="mb-6 text-center">
              <img
                src="https://img.vietqr.io/image/TCB-19037144050012-compact.png"
                alt="QR Code"
                width="256"
                height="256"
                className="mx-auto"
              />
              <p className="mt-2 text-gray-700">
                Quét mã QR để thực hiện thanh toán chuyển khoản
              </p>
            </div>
          )
            :
            <></>
          }
        </div>
        <div>
          <Button
            onClick={handleClose}
          >
            Đóng
          </Button>
          <Button>
            Xác nhận
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Payment;

