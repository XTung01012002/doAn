import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayVNDCurrency from "../helpers/displayVNDCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  if (!data) {
    console.error("Invalid product data:", data);
    return null;
  }

  const productImage = Array.isArray(data?.productImage) && data.productImage[0]
    ? data.productImage[0]
    : "https://via.placeholder.com/150";

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="w-40">
        {/* Product Image */}
        <div className=" w-full h-[150px] flex justify-center items-center overflow-hidden bg-gray-100 rounded">
          <img
            src={productImage}
            alt={data?.productName || "No product name"}
            className="object-cover w-[150px] h-[150px] "
          />
        </div>

        {/* Product Name */}
        <h1 className="font-semibold mt-2 max-w-[150px] truncate" title={data?.productName}>
          {data?.productName || "Tên sản phẩm không có"}
        </h1>


        {/* Product Price and Actions */}
        <div className="mt-2">
          <p className="font-semibold text-red-600">
            {data?.sellingPrice
              ? displayVNDCurrency(data.sellingPrice)
              : "Giá không có"}
          </p>

          {/* Edit Button */}
          <div
            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer transition-all"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
