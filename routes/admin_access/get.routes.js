const userController = require("../../controllers/user.controller");
const orderController = require("../../controllers/order.controller");
const priceController = require("../../controllers/price.controller");
const router = require('express').Router();

router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);

router.get("/orders", orderController.findAll);
router.get("/orders/:id", orderController.findOne);

router.get("/prices", priceController.findAll);
router.get("/prices/:id", priceController.findOne);

module.exports = router;