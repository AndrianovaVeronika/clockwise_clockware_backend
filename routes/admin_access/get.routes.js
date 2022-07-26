const userController = require("../../controllers/user.controller");
const orderController = require("../../controllers/order.controller");
const router = require('express').Router();

router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);

router.get("/orders", orderController.findAll);
router.get("/orders/:id", orderController.findOne);

module.exports = router;