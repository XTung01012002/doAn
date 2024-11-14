const { BadRequestError } = require("../responseHandle/error.response");
const { shippingInfoSchema } = require("../models/shippinginfo.model");
const { paymentInfoSchema } = require("../models/paymentinfo.model");
const { productSchema } = require("../models/product.model");

class ShippingInfoService {
  static createShip = async (data, id) => {
    const { maVanDon, shippingMethod, deliveryDate, shippingFee } = data;
    const checkPaymentInfo = await paymentInfoSchema.findById(id);
    if (!checkPaymentInfo) {
      throw new BadRequestError("Thông tin thanh toán không tồn tại");
    }

    // nếu tạo đơn thành công thì giảm số lượng quantityInStock
    const productList = checkPaymentInfo.productList;
    for (let i = 0; i < productList.length; i++) {
      const product = await productSchema.findById(productList[i].productId);
      if (!product) {
        throw new BadRequestError("Sản phẩm không tồn tại");
      }
      // số lượng product mà lớn hơn số lương trong kho sẽ lỗi
      if (product.quantityInStock < productList[i].quantity) {
        throw new BadRequestError("Số lượng sản phẩm trong kho không đủ");
      }
      product.quantityInStock -= productList[i].quantity;
      await product.save();
    }

    const shippingInfo = await shippingInfoSchema.create({
      paymentInfo: id,
      maVanDon,
      shippingMethod,
      deliveryDate,
      shippingFee,
    });

    return shippingInfo;
  };
  static updateShippingStatus = async (data, id) => {
    const { shippingStatus, deliveryDate } = data;

    // Find shipping information by ID
    const checkShippingInfo = await shippingInfoSchema.findById(id);
    if (!checkShippingInfo) {
      throw new BadRequestError("Thông tin vận chuyển không tồn tại");
    }

    const checkPaymentInfo = await paymentInfoSchema.findById(
      checkShippingInfo.paymentInfo
    );
    if (!checkPaymentInfo) {
      throw new BadRequestError("Thông tin thanh toán không tồn tại");
    }

    const statusMap = {
      "Đã giao": "Đã giao hàng",
      "Đã hủy": "Đã hủy",
      "Đang giao": "Đang giao hàng",
      "Đã lấy hàng": "Đang giao hàng",
    };

    const newOrderStatus = statusMap[shippingStatus];
    if (checkPaymentInfo.orderStatus !== newOrderStatus) {
      checkPaymentInfo.orderStatus = newOrderStatus;
      await checkPaymentInfo.save();
    }

    const updatedShippingInfo = await shippingInfoSchema.findByIdAndUpdate(
      id,
      {
        shippingStatus,
        deliveryDate,
      },
      { new: true }
    );

    // nếu trạng thái là đã giao hàng thì tăng số lượng quantityInSold
    if (shippingStatus === "Đã giao") {
      const productList = checkPaymentInfo.productList;
      for (let i = 0; i < productList.length; i++) {
        const product = await productSchema.findById(productList[i].productId);
        if (!product) {
          throw new BadRequestError("Sản phẩm không tồn tại");
        }
        product.quantitySold += productList[i].quantity;
        await product.save();
      }
    }
    return updatedShippingInfo;
  };

  static getShippingInfo = async (id) => {
    const shippingInfo = await shippingInfoSchema.findById(id);
    if (!shippingInfo) {
      throw new BadRequestError("Thông tin vận chuyển không tồn tại");
    }
    return shippingInfo;
  };

  static getAllShippingInfo = async () => {
    const shippingInfo = await shippingInfoSchema.find();
    return shippingInfo;
  };

  static getShippingInfoByStatus = async (status) => {
    const shippingInfo = await shippingInfoSchema.find({
      shippingStatus: status,
    });
    return shippingInfo;
  };
}
module.exports = ShippingInfoService;
