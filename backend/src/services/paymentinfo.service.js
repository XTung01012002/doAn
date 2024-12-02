const { paymentInfoSchema } = require("../models/paymentinfo.model");
const { BadRequestError } = require("../responseHandle/error.response");
const axios = require("axios");
const crypto = require("crypto");
const config = require("../configs/config");
const { productSchema } = require("../models/product.model");

class PaymentInfoService {
  static getById = async (id) => {
    const paymentInfo = await paymentInfoSchema.findById(id);
    return paymentInfo;
  };

  // User
  static getAllByUser = async (req) => {
    const sessionUser = req.user;
    const paymentInfo = await paymentInfoSchema.find({ userId: sessionUser });
    return paymentInfo;
  };

  static getAllNotConfirmOrderByUser = async (req) => {
    const sessionUser = req.user;
    return await paymentInfoSchema
      .find({
        userId: sessionUser,
        confirmOrder: false,
        orderStatus: { $ne: "Đã hủy" },
      })
      .populate({
        path: "productList.productId",
        select:
          "productName brandName category productImage description price sellingPrice ",
      })
      .populate({ path: "userId", select: "name profilePic -_id" })
      .lean()
      .exec();
  };

  static getAllConfirmOrderByUser = async (req) => {
    const sessionUser = req.user;
    return await paymentInfoSchema
      .find({
        userId: sessionUser,
        confirmOrder: true,
      })
      .populate("productList.productId")
      .exec();
  };

  static getAllCanceledOrderByUser = async (req) => {
    const sessionUser = req.user;
    return await paymentInfoSchema
      .find({
        userId: sessionUser,
        orderStatus: "Đã hủy",
      })
      .populate("productList.productId")
      .exec();
  };

  //chỉnh sửa đơn hàng của user
  static updateByUser = async (data, id, req) => {
    const sessionUser = req.user;
    const { phone, address, productList } = data;
    const paymentInfo = await paymentInfoSchema
      .findOne({
        userId: sessionUser,
        confirmOrder: false,
        _id: id,
      })
      .populate("productList.productId")
      .exec();
    console.log(paymentInfo + "paymentInfo");
    if (!paymentInfo) {
      throw new BadRequestError("Không tìm thấy đơn hàng");
    }
    // let totalAmount = 0;
    // for (let i = 0; i < productList.length; i++) {
    //   const product = await productSchema.findById(productList[i].productId);
    //   if (!product) {
    //     throw new BadRequestError("Sản phẩm không tồn tại");
    //   }
    //   totalAmount += product.price * productList[i].quantity;
    // }

    paymentInfo.phone = phone;
    paymentInfo.address = address;
    // paymentInfo.productList = productList;
    // paymentInfo.totalAmount = totalAmount;
    await paymentInfo.save();

    return paymentInfo;
  };

  static cancelOrderByUser = async (req, id) => {
    const sessionUser = req.user;
    console.log(sessionUser + "sessionUser");
    console.log(id + "id");
    const paymentInfo = await paymentInfoSchema
      .findOne({
        userId: sessionUser,
        confirmOrder: false,
        _id: id,
      })
      .populate("productList.productId")
      .exec();
    console.log(paymentInfo + "paymentInfo");
    if (!paymentInfo) {
      throw new BadRequestError("Không tìm thấy đơn hàng");
    }
    paymentInfo.orderStatus = "Đã hủy";
    await paymentInfo.save();
  };

  static confirmOrderByUser = async (req, id) => {
    const sessionUser = req.user;
    console.log(sessionUser + "sessionUser");
    const paymentInfo = await paymentInfoSchema
      .findOne({
        userId: sessionUser,
        confirmOrder: false,
        _id: id,
      })
      .populate("productList.productId")
      .exec();
    if (!paymentInfo) {
      throw new BadRequestError("Không tìm thấy đơn hàng");
    }
    paymentInfo.confirmOrder = true;
    paymentInfo.paymentStatus = "thanh toán khi nhận hàng";
    await paymentInfo.save();

    return paymentInfo;
  };

  static create = async (data, req) => {
    const sessionUser = req.user;
    const { phone, address, productList } = data;
    let totalAmount = 0;
    for (let i = 0; i < productList.length; i++) {
      const product = await productSchema.findById(productList[i].productId);
      if (!product) {
        throw new BadRequestError("Sản phẩm không tồn tại");
      }
      totalAmount += product.sellingPrice * productList[i].quantity;
    }
    console.log(sessionUser._id + "sessionUser._id");
    const payload = {
      userId: sessionUser,
      phone,
      address,
      productList,
      totalAmount,
    };
    console.log(payload.userId + "payload");
    const paymentInfo = new paymentInfoSchema(payload);
    await paymentInfo.save();

    return paymentInfo;
  };

  static transactions = {};

  static generateTransactionId() {
    return crypto.randomBytes(4).toString("hex").substring(0, 7);
  }

  static createVietQR = async (req) => {
    const { totalAmount } = req.body;
    const transactionId = this.generateTransactionId();

    const qrUrl = `https://img.vietqr.io/image/${config.bankInfo.bankId}-${
      config.bankInfo.bankAccount
    }-${
      config.bankInfo.template
    }.png?amount=${totalAmount}&addInfo=${encodeURIComponent(
      +" Ma giao dich " + transactionId
    )}&accountName=${encodeURIComponent(config.bankInfo.accountName)}`;

    this.transactions[transactionId] = {
      status: "đang xử lý",
      totalAmount,
    };

    return { qrUrl, transactionId };
  };

  static checkTransactionStatus = async (transactionId, paymentInfoId) => {
    const paymentInfo = await paymentInfoSchema.findById(paymentInfoId);
    if (!paymentInfo) {
      throw new BadRequestError("Thông tin thanh toán không tồn tại");
    }

    const transaction = this.transactions[transactionId];
    if (!transaction) {
      throw new Error("Giao dịch không tồn tại");
    }

    try {
      const response = await axios.get(`${config.casso.apiUrl}/transactions`, {
        headers: {
          Authorization: `Apikey ${config.casso.apiKey}`,
          "Content-Type": "application/json",
        },
      });
      const transactionsData = response.data.data.records;
      const updatedTransaction = transactionsData.find((t) =>
        t.description.includes(transactionId)
      );

      if (updatedTransaction) {
        this.transactions[transactionId].status = "success";
        paymentInfo.paymentStatus = "Đã thanh toán";
        paymentInfo.confirmOrder = true;
        await paymentInfo.save();
        return { status: "Đã thanh toán", transaction: updatedTransaction };
      } else {
        return { status: "Đang xử lí" };
      }
    } catch (error) {
      console.error(
        "Error checking transaction status:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Error checking transaction status");
    }
  };

  // Sau khi mua lại thì xóa đơn đã hủy
  static deleteCanceledOrder = async (req, id) => {
    const sessionUser = req.user;
    const paymentInfo = await paymentInfoSchema
      .findOne({
        userId: sessionUser,
        orderStatus: "Đã hủy",
        _id: id,
      })
      .populate("productList.productId")
      .exec();

    if (!paymentInfo) {
      throw new BadRequestError("Không tìm thấy đơn hàng");
    }

    await paymentInfoSchema.deleteOne({ _id: paymentInfo._id });
  };

  // lấy ra những đơn hàng đang giao hàng và đang chờ đơn vị vận chuyển
  static getAllShippingOrder = async (req) => {
    const sessionUser = req.user;
    return await paymentInfoSchema
      .find({
        userId: sessionUser,
        orderStatus: { $in: ["Đang giao hàng", "Đang chờ đơn vị vận chuyển"] },
      })
      .populate("productList.productId")
      .populate({ path: "userId", select: "name profilePic -_id" })
      .exec();
  };

  // chon phương thức thanh toán khi nhận hàng
  static choosePaymentMethod = async (req, id) => {
    const sessionUser = req.user;
    const paymentInfo = await paymentInfoSchema
      .findOne({
        userId: sessionUser,
        _id: id,
      })
      .populate("productList.productId")
      .exec();
    if (!paymentInfo) {
      throw new BadRequestError("Không tìm thấy đơn hàng");
    }
    paymentInfo.paymentStatus = "thanh toán khi nhận hàng";
    await paymentInfo.save();
  };

  // lấy tất cả đơn hàng đã giao của user
  static getAllDeliveredOrder = async (req) => {
    const sessionUser = req.user;

    try {
      // Lấy tất cả đơn hàng đã giao
      const orders = await paymentInfoSchema
        .find({
          userId: sessionUser,
          orderStatus: "Đã giao hàng",
        })
        .populate("productList.productId") // Populate thông tin sản phẩm
        .populate({ path: "userId", select: "name profilePic -_id" })
        .exec();

      // Lọc sản phẩm chưa được đánh giá
      const filteredOrders = orders.map((order) => {
        const filteredProductList = order.productList.filter((productItem) => {
          const product = productItem.productId;

          // Kiểm tra nếu người dùng chưa đánh giá sản phẩm
          const userHasNotReviewed = !product.listComment.some(
            (comment) => comment.userId.toString() === sessionUser.toString()
          );

          return userHasNotReviewed;
        });
        console.log("filteredProductList:::", filteredProductList);

        return {
          ...order.toObject(), // Chuyển đổi sang object để xử lý
          productList: filteredProductList, // Cập nhật danh sách sản phẩm đã lọc
        };
      });

      // Loại bỏ đơn hàng rỗng (không còn sản phẩm nào chưa đánh giá)
      const nonEmptyOrders = filteredOrders.filter(
        (order) => order.productList.length > 0
      );
      console.log("nonEmptyOrders:::", nonEmptyOrders); 

      return nonEmptyOrders;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng đã giao:", error);
      throw new Error("Không thể lấy danh sách đơn hàng đã giao");
    }
  };

  // SALE
  // lấy tất cả đơn hàng đã xác nhận
  static getAllConfirmedOrderSale = async () => {
    return await paymentInfoSchema
      .find({ confirmOrder: true })
      .populate("productList.productId")
      .populate({ path: "userId", select: "name profilePic -_id" })
      .exec();
  };
  // lấy tất cả các đơn hàng đã hủy
  static getAllCanceledOrderSale = async () => {
    return await paymentInfoSchema
      .find({ orderStatus: "Đã hủy" })
      .populate("productList.productId")
      .populate({ path: "userId", select: "name profilePic -_id" })
      .exec();
  };

  // lấy tất cả các đơn hàng chưa xác nhận
  static getAllNotConfirmOrderSale = async () => {
    return await paymentInfoSchema
      .find({ confirmOrder: false })
      .populate("productList.productId")
      .populate({ path: "userId", select: "name profilePic -_id" })
      .exec();
  };
}

module.exports = PaymentInfoService;
