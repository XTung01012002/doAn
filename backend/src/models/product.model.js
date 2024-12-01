const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: {
      type: Number,
      default: 0,
    },
    sellingPrice: {
      type: Number,
      default: 0,
    },
    priceInventory: {
      type: Number,
      default: 0,
    },
    quantityInStock: {
      type: Number,
      default: 0,
    },
    quantitySold: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: false,
    },
    // danh sách bình luận và dánh giá của sản phẩm
    listComment: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        comment: String,
        rate: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],
    totalRate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = { productSchema: model("product", productSchema) };
