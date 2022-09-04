const router = require('express').Router();
const orderController = require("../../controllers/order.controller");
const {validateIfBodyUndefined, authJwt} = require("../../validators");

router.use(validateIfBodyUndefined);

router.get('/current_user/orders', [authJwt.verifyToken], orderController.findAllCurrentUserOrders);

module.exports = router;