const express = require("express");
const router = express.Router();
const ShippingInfoController = require("../controllers/shippinginfo.controller");
const asyncHandle = require("../helpers/asyncHandler");

router.post("/create/:id", asyncHandle(ShippingInfoController.create));
router.put("/updateShippingStatus/:id", asyncHandle(ShippingInfoController.updateShippingStatus));
router.get("/all", asyncHandle(ShippingInfoController.getAllShippingInfo));
router.get("/by/:id", asyncHandle(ShippingInfoController.getShippingInfo));
router.get("/byStatus", asyncHandle(ShippingInfoController.getShippingInfoByStatus));

module.exports = router;
