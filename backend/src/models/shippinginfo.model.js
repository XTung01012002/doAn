const { model, Schema } = require("mongoose");

const shippingInfoSchema = new Schema(
  {
    paymentInfo: {
      type: Schema.Types.ObjectId,
      ref: "paymentInfo",
      require: true,
    },
    maVanDon: {
      type: String,
      required: true,
    },
    shippingMethod: {
      type: String,
      enum: [
        "Chuyển phát nhanh",
        "Chuyển phát tiêu chuẩn",
        "Giao hàng tiết kiệm",
      ],
      required: true,
    },
    shippingStatus: {
      type: String,
      enum: ["Đang xử lý", "Đang giao", "Đã giao", "Đã hủy"],
      default: "Đang xử lý",
    },
    deliveryDate: {
      type: Date,
    },
    shippingFee: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("shippingInfo", shippingInfoSchema);
