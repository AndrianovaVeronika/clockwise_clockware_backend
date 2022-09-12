const router = require('express').Router();
const orderController = require("../../controllers/order.controller");
const {ifBodyUndefined, verifyTokenAndExtractUserId, roleValidator} = require("../../validators");

router.use(ifBodyUndefined);

router.get('/current_master/orders',
    [verifyTokenAndExtractUserId, roleValidator.isMaster],
    orderController.findAllCurrentMasterOrders);

module.exports = router;