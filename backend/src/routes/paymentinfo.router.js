const express = require("express");
const router = express.Router();
const PaymentInfoController = require("../controllers/paymentinfo.controller");
const asyncHandle = require("../helpers/asyncHandler");
const { authToken, authRole } = require("../middlewares/auth");

router.use(authToken);

router.get("/all", asyncHandle(PaymentInfoController.getAll));
router.get("/:id", asyncHandle(PaymentInfoController.getById));
router.post("/qr", asyncHandle(PaymentInfoController.createVietQR));
router.get("/:transactionId",asyncHandle(PaymentInfoController.checkTransactionStatus));
router.post("", asyncHandle(PaymentInfoController.create));
router.put("/:id", asyncHandle(PaymentInfoController.update));
router.delete("/:id", asyncHandle(PaymentInfoController.delete));


module.exports = router;
