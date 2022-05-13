const router = require('express').Router();
const orderController = require("../../controllers/order.controller");
const {ifOrderExist, validateIfBodyUndefined} = require("../../validators");
const {validateOrder} = require("../../validators/validateOrder");

router.post("/orders", [validateIfBodyUndefined, validateOrder, ifOrderExist], orderController.create);

module.exports = router;