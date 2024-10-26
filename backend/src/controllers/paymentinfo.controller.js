const { paymentInfoSchema } = require("../models/paymentinfo.model");
const { SuccessResponse } = require("../responseHandle/success.response");
const PaymentInfoService = require("../services/paymentinfo.service");

class PaymentInfoController {
  getAll = async (req, res) => {
    const paymentInfo = await PaymentInfoService.getAll();
    new SuccessResponse({
      message: "Lấy thông tin thanh toán thành công",
      data: paymentInfo,
    }).send(res);
  };

  getById = async (req, res) => {
    const paymentInfo = await PaymentInfoService.getById(req.params.id);
    new SuccessResponse({
      message: "Lấy thông tin thanh toán thành công",
      data: paymentInfo,
    }).send(res);
  };

  createVietQR = async (req, res) => {
    const qr = await PaymentInfoService.createVietQR(req);
    new SuccessResponse({
      message: "Tạo mã QR thành công",
      data: qr,
    }).send(res);
  };

  checkTransactionStatus = async (req, res) => {
    const transaction = await PaymentInfoService.checkTransactionStatus(
      req.params.transactionId
    );
    new SuccessResponse({
      message: "Kiểm tra trạng thái giao dịch thành công",
      data: transaction,
    }).send(res);
  };

  create = async (req, res) => {
    const paymentInfo = await PaymentInfoService.create(req.body, req);
    new SuccessResponse({
      message: "Tạo thông tin thanh toán thành công",
      data: paymentInfo,
    }).send(res);
  };

  update = async (req, res) => {
    const paymentInfo = await PaymentInfoService.update(
      req.body,
      req.params.id
    );
    new SuccessResponse({
      message: "Cập nhật thông tin thanh toán thành công",
      data: paymentInfo,
    }).send(res);
  };

  delete = async (req, res) => {
    const paymentInfo = await PaymentInfoService.delete(req.params.id);
    new SuccessResponse({
      message: "Xóa thông tin thanh toán thành công",
      data: paymentInfo,
    }).send(res);
  };

  cancel = async (req, res) => {
    const paymentInfo = await PaymentInfoService.cancel(req.params.id);
    new SuccessResponse({
      message: "Hủy đơn hàng thành công",
      data: paymentInfo,
    }).send(res);
  };
}
module.exports = new PaymentInfoController();
