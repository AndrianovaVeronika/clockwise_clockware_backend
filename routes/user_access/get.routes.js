const router = require('express').Router();
const orderController = require("../../controllers/order.controller");
const {ifBodyUndefined, verifyTokenAndExtractUserId} = require("../../validators");

router.use(ifBodyUndefined);

router.get('/current_user/orders',
    [verifyTokenAndExtractUserId],
    orderController.findAllCurrentUserOrders);

module.exports = router;