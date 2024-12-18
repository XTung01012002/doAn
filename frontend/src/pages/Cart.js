import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayVNDCurrency from "../helpers/displayVNDCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, Card, Divider, Modal, Typography } from 'antd';
import styles from './ScrollCardX.module.css'
import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
const { Title, Text } = Typography;
const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const dataResponse = await fetch(SummaryApi.addProductToCartView.url, {
      method: SummaryApi.addProductToCartView.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    setData(dataApi.data);
    console.log('data', dataApi.data);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const updateQuantity = async (productId, quantity, action) => {
    const newQuantity = action === "increase" ? quantity + 1 : quantity - 1;
    if (newQuantity === 0) {
      openDeleteModal(productId);
      return;
    }

    if (newQuantity >= 0) {
      const response = await fetch(SummaryApi.updateQuantityInCart.url, {
        method: SummaryApi.updateQuantityInCart.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
          quantity: newQuantity,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    }
  };

  const increaseQty = (productId, quantity) => {
    updateQuantity(productId, quantity, "increase");
  };

  const decreaseQty = (productId, quantity) => {
    updateQuantity(productId, quantity, "decrease");
  };

  const deleteProductInCart = async (productId) => {
    const response = await fetch(SummaryApi.deleteProductInCart.url, {
      method: SummaryApi.deleteProductInCart.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: productId }),
    });
    const dataResponse = await response.json();
    if (dataResponse.success) {
      toast.success(dataResponse.message);
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const openDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProductId) {
      deleteProductInCart(selectedProductId);
    }
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const totalQuantity = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (prev, curr) => prev + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  localStorage.setItem("totalPrice", totalPrice);
  console.log("totalPrice: ", totalPrice);
  console.log('test', data);

  return (
    <div className="container mx-auto">
      {data.length === 0 && !loading ? (
        <div className="text-center text-lg my-3">
          <p className="bg-white py-5">No Data</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:justify-between mt-6">
          <div className={`${styles.scrollableContainer}`}>
            {loading
              ? loadingCart?.map((el, index) => (
                <div
                  key={el + "Thêm vào giỏ hàng" + index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                ></div>
              ))
              : data.map((product, _index) => (
                <div
                  key={product?._id + "Thêm vào giỏ hàng"}
                  className="w-[90vh] bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productImage[0]}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    <div
                      className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => openDeleteModal(product?.productId)}
                    >
                      <MdDelete />
                    </div>

                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-medium text-lg">
                        {displayVNDCurrency(product?.productId?.sellingPrice)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <Button onClick={() => decreaseQty(product?.productId?._id, product?.quantity)}>
                        -
                      </Button>
                      <span>{product?.quantity}</span>
                      <Button onClick={() => increaseQty(product?.productId?._id, product?.quantity)}>
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

            <Card
              title={<Title level={4} style={{ color: 'white' , marginTop: '10px', textAlign: 'center', alignItems: 'center'}}>Tổng đơn</Title>}
              bordered={false}
              style={{
                width: '100%',
                maxWidth: '300px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
              styles={{
                header: {
                  backgroundColor: '#FF4D4F',
                  borderRadius: '8px 8px 0 0',
                },
                body: {
                  padding: '20px'
                }
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Số lượng:</Text> <Text>{totalQuantity}</Text>
              </div>

              <Divider style={{ margin: '10px 0' }} />

              <div style={{ marginBottom: '16px' }}>
                <Text strong>Tổng tiền:</Text>
                <Text type="danger" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {displayVNDCurrency(totalPrice)}
                </Text>
              </div>

              <Link to="/payment">
                <Button
                  type="primary"
                  block
                  size="large"
                  style={{ borderRadius: '8px', backgroundColor: '#1677FF' }}
                  onClick={() => setData([])}
                >
                  Thanh toán
                </Button>
              </Link>
            </Card>
        </div>
      )}

      <Modal
        title="Xác nhận xóa sản phẩm"
        open={isModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
      </Modal>
    </div>
  );
};

export default Cart;
