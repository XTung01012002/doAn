import React, { useState, useEffect } from "react";
import UploadProduct from "../components/UpLoadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import productCategory from "../helpers/productCategory";

const AllProduct = () => {
  const [openUpLoadProduct, setOpenUpLoadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  // Fetch products from API
  const fetchAllProduct = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.allProducts.url, {
        method: SummaryApi.allProducts.method,
        credentials: "include",
      });
      const dataApi = await dataResponse.json();
      if (Array.isArray(dataApi.data) && dataApi.data.length > 0) {
        setAllProduct(dataApi.data);
      } else {
        console.warn("No products found or invalid data:", dataApi.data);
        setAllProduct([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setAllProduct([]);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Danh sách sản phẩm</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUpLoadProduct(true)}
        >
          Thêm sản phẩm
        </button>
      </div>

      {/* Filter by category */}
      <div className="py-2">
        <form className="text-sm flex flex-wrap gap-4 py-2">
          {productCategory.map((categoryName) => (
            <div className="flex items-center gap-2" key={categoryName.value}>
              <input
                type="checkbox"
                name="category"
                value={categoryName?.value}
                id={categoryName?.value}
              />
              <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
            </div>
          ))}
        </form>
      </div>

      {/* All Products */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-300px)] overflow-y-scroll">
        {allProduct.length > 0 ? (
          allProduct.map((product, index) => (
            <AdminProductCard
              data={product}
              key={product.id || `product-${index}`}
              fetchData={fetchAllProduct}
            />
          ))
        ) : (
          <p className="text-gray-500">Không có sản phẩm nào.</p>
        )}
      </div>

      {/* Upload Product Modal */}
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
