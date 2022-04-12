const router = require('express').Router();
const orderController = require("../../controllers/order.controller");
const {ifOrderExist} = require("../../validators");

router.post("/orders", [ifOrderExist], orderController.create);

module.exports = router;