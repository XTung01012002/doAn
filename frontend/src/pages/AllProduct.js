import React, { useState, useEffect } from "react";
import UploadProduct from "../components/UpLoadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import productCategory from "../helpers/productCategory";

const AllProduct = () => {
  const [openUpLoadProduct, setOpenUpLoadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const dataResponse = await fetch(SummaryApi.allProducts.url, {
      method: SummaryApi.allProducts.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      setAllProduct(dataApi.data);
    }
    console.log("allProduct", dataApi.data);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Danh sách sản phẩm</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUpLoadProduct(true)}
        >
          Thêm sản phẩm
        </button>
      </div>

      <div className='py-2'>
        {/* <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3> */}
        <form className='text-sm flex flex-wrap gap-4 py-2'>
          {
            productCategory.map((categoryName, index) => (
              <div className='flex items-center gap-2' key={categoryName.value}>
                <input type='checkbox' name={"category"} value={categoryName?.value} id={categoryName?.value} />
                <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
              </div>
            ))
          }
        </form>
      </div>

      {/** all product */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => (
          <AdminProductCard
            data={product}
            key={index + "allProduct"}
            fetchData={fetchAllProduct}
          />
        ))}
      </div>

      {/** upload product component */}
      {openUpLoadProduct && (
        <UploadProduct
          onClose={() => setOpenUpLoadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProduct;
