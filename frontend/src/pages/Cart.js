import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayVNDCurrency from "../helpers/displayVNDCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import styles from './ScrollCardX.module.css'


const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
      )
        :
        <div className="flex flex-col lg:flex-row  lg:justify-between mt-6">
          <div className={`${styles.scrollableContainer}`}>
            {loading
              ? loadingCart?.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
              : data.map((product, _index) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-[90vh] bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
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
                        onClick={() => deleteProductInCart(product?.productId)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          {displayVNDCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayVNDCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            decreaseQty(
                              product?.productId?._id,
                              product?.quantity
                            )
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            increaseQty(
                              product?.productId?._id,
                              product?.quantity
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-red-600 px-4 py-1 rounded-t-xl">Tóm tắt</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Số lượng</p>
                  <p>{totalQuantity}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Tổng tiền</p>
                  <p>{displayVNDCurrency(totalPrice)}</p>
                </div>
                <Link
                  to={"/payment"}
                >
                  <button
                    onClick={() => {
                        setData([]);
                    }}
                    className="bg-blue-600 p-2 rounded-b-xl text-white w-full mt-2"
                  >
                    Thanh toán
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default Cart;
