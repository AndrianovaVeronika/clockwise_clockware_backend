const router = require('express').Router();
const userController = require("../../controllers/user.controller");
const orderController = require("../../controllers/order.controller");
const {verifyTokenAndExtractUserId, ifBodyUndefined} = require("../../validators");
const validatePasswordChange = require("../../validators/validatePasswordChange");

router.use(ifBodyUndefined);
router.use(verifyTokenAndExtractUserId);

router.put("/update/credentials", [validatePasswordChange], userController.update);

router.put("/rate/order/:id", orderController.rateOrder);

module.exports = router;