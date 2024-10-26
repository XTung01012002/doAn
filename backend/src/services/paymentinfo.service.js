const { paymentInfoSchema } = require("../models/paymentinfo.model");
const { BadRequestError } = require("../responseHandle/error.response");
const axios = require("axios");
const crypto = require("crypto");
const config = require("../configs/config");
const { productSchema } = require("../models/product.model");

class PaymentInfoService {
  static getAll = async () => {
    return await paymentInfoSchema.find();
  };
  static getById = async (id) => {
    console.log("id", id);
    return await paymentInfoSchema.findById(id);
  };
  static create = async (data, req) => {
    const sessionUser = req.user;
    console.log("sessionUser", sessionUser);
    const { phone, address, productList } = data;
    let totalAmount = 0;

    for (let i = 0; i < productList.length; i++) {
      const product = await productSchema.findById(productList[i].productId);
      if (!product) {
        throw new BadRequestError("Sản phẩm không tồn tại");
      }
      totalAmount += product.price * productList[i].quantity;
    }
    console.log("totalAmount", totalAmount);

    const payload = {
      userId: sessionUser._id,
      phone,
      address,
      productList,
      totalAmount,
    };
    const paymentInfo = new paymentInfoSchema(payload);
    await paymentInfo.save();

    return paymentInfo;
  };
  static update = async (data, id) => {
    const { phone, address, productList } = data;
    const paymentInfo = await paymentInfoSchema.findByIdAndUpdate(
      id,
      {
        phone,
        address,
        productList,
      },
      { new: true }
    );
    return paymentInfo;
  };

  static delete = async (id) => {
    const paymentInfo = await paymentInfoSchema.findByIdAndDelete(id);
    if (!paymentInfo) {
      throw new BadRequestError("Thông tin thanh toán không tồn tại");
    }
    return paymentInfo;
  };

  static cancel = async (id) => {
    const paymentInfo = await payment;
    InfoSchema.findByIdAndUpdate(
      id,
      {
        orderStatus: "Đã hủy",
      },
      { new: true }
    );
    return paymentInfo;
  };

  static confirmOrder = async (id) => {
    const paymentInfo = await payment;
    InfoSchema.findByIdAndUpdate(
      id,
      {
        confirmOrder: true,
      },
      { new: true }
    );
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
}

module.exports = PaymentInfoService;
