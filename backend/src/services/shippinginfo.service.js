const { BadRequestError } = require("../responseHandle/error.response");
const { shippingInfoSchema } = require("../models/shippinginfo.model");
const { paymentInfoSchema } = require("../models/paymentinfo.model");

class ShippingInfoService {
  static create = async (data, id) => {
    const {
      maVanDon,
      shippingMethod,
      shippingStatus,
      deliveryDate,
      shippingFee,
    } = data;
    const checkPaymentInfo = await paymentInfoSchema.findById(id);
    if (!checkPaymentInfo) {
      throw new BadRequestError("Thông tin thanh toán không tồn tại");
    }
    const shippingInfo = await shippingInfoSchema.create({
      paymentInfo: id,
      maVanDon,
      shippingMethod,
      shippingStatus,
      deliveryDate,
      shippingFee,
    });
    return shippingInfo;
  };
  static update = async (data, id) => {
    const { shippingStatus, deliveryDate } = data;
    const checkShippingInfo = await shippingInfoSchema.findById(id);
    if (!checkShippingInfo) {
      throw new BadRequestError("Thông tin vận chuyển không tồn tại");
    }
    if (shippingStatus === "Đã giao") {
      const checkPaymentInfo = await paymentInfoSchema.findById(
        checkShippingInfo.paymentInfo
      );
      checkPaymentInfo.orderStatus = "Đã giao hàng";
      await checkPaymentInfo.save();
    }

    const shippingInfo = await shippingInfoSchema.findByIdAndUpdate(
      id,
      {
        shippingStatus,
        deliveryDate,
      },
      { new: true }
    );
    return shippingInfo;
  };
}
module.exports = ShippingInfoService;
