const { shippingInfoSchema } = require("../models/shippinginfo.model");
const { SuccessResponse } = require("../responseHandle/success.response");

class ShippingInfoService {
  create = async (req, res, next) => {
    const shippingInfo = await shippingInfoSchema.create(
      req.body,
      req.params.id
    );
    new SuccessResponse({
      message: "Tạo thông tin vận chuyển thành công",
      data: shippingInfo,
    }).send(res);
  };
  update = async (req, res, next) => {
    const shippingInfo = await shippingInfoSchema.update(
      req.body,
      req.params.id
    );
    new SuccessResponse({
      message: "Cập nhật trạng thái đơn hàng thành công",
      data: shippingInfo,
    }).send(res);
  };
}

module.exports = new ShippingInfoService();
