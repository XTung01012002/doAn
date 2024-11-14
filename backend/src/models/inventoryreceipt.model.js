const { model, Schema } = require("mongoose");

const inventoryReceiptSchema = new Schema(
  {
    productList: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    // nhà cung cấp
    supplier: {
      type: String,
      required: true,
    },
    // người nhập
    creator: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);

module.exports = { inventoryReceiptSchema: model("inventoryReceipt", inventoryReceiptSchema) };
