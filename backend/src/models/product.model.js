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
    comments: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = { productSchema: model("product", productSchema) };
