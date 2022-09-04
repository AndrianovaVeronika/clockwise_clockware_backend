const router = require('express').Router();
const orderController = require("../../controllers/order.controller");
const {validateIfBodyUndefined, authJwt} = require("../../validators");

router.use(validateIfBodyUndefined);

router.get('/current_master/orders', [authJwt.verifyToken, authJwt.isMaster], orderController.findAllCurrentMasterOrders);

module.exports = router;