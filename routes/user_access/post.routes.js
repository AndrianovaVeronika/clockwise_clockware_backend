const router = require('express').Router();
const orderController = require("../../controllers/order.controller");
const {ifOrderExist} = require("../../validators");
const {validateOrder} = require("../../validators/validateOrder");

router.post("/orders", [validateOrder, ifOrderExist], orderController.create);

module.exports = router;