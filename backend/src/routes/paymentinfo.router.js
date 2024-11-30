const express = require("express");
const router = express.Router();
const PaymentInfoController = require("../controllers/paymentinfo.controller");
const asyncHandle = require("../helpers/asyncHandler");
const { authToken, authRole } = require("../middlewares/auth");

router.use(authToken);

// đối với user
router.get("/all", asyncHandle(PaymentInfoController.getAllByUser));
router.get("/all-not-confirm-order", asyncHandle(PaymentInfoController.getAllNotConfirmOrderByUser));
router.get("/all-confirm-order", asyncHandle(PaymentInfoController.getAllConfirmOrderByUser));
router.get("/all-canceled-order", asyncHandle(PaymentInfoController.getAllCanceledOrderByUser));
router.put("/update/:id", asyncHandle(PaymentInfoController.updateByUser));
router.put("/cancel-order/:id", asyncHandle(PaymentInfoController.cancelOrderByUser));
router.put("/confirm-order/:id", asyncHandle(PaymentInfoController.confirmOrderByUser));
router.post("/create", asyncHandle(PaymentInfoController.create));
router.post("/createQr", asyncHandle(PaymentInfoController.createVietQR));
router.get("/check/:transactionId",asyncHandle(PaymentInfoController.checkTransactionStatus));
router.get("/by/:id", asyncHandle(PaymentInfoController.getById));
router.delete("/deleteCanceledOrder/:id", asyncHandle(PaymentInfoController.deleteCanceledOrder));
router.get("/all-ShippingOrder", asyncHandle(PaymentInfoController.getAllShippingOrder));
router.get("/all-DeliveredOrder", asyncHandle(PaymentInfoController.getAllDeliveredOrder));
// đối với sale
router.get("/all-confirm-order-sale", asyncHandle(PaymentInfoController.getAllConfirmedOrderSale));
router.get("/all-cancel-order-sale", asyncHandle(PaymentInfoController.getAllCanceledOrderSale));
router.get("/all-not-confirm-order-sale", asyncHandle(PaymentInfoController.getAllNotConfirmOrderSale));

module.exports = router;
