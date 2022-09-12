const router = require('express').Router();
const cityController = require('../../controllers/city.controller');
const masterController = require("../../controllers/master.controller");
const orderController = require("../../controllers/order.controller");
const userController = require("../../controllers/user.controller");
const {ifObjectAssignedToOrder} = require("../../validators");

router.delete("/cities/:id", [ifObjectAssignedToOrder.city], cityController.delete);

router.delete("/masters/:id", [ifObjectAssignedToOrder.master], masterController.delete);

router.delete("/orders/:id", orderController.delete);

router.delete("/users/:id", [ifObjectAssignedToOrder.user], userController.delete);

module.exports = router;