const router = require('express').Router();
const cityController = require('../../controllers/city.controller');
const masterController = require("../../controllers/master.controller");
const orderController = require("../../controllers/order.controller");
const userController = require("../../controllers/user.controller");

router.delete("/cities/:id", cityController.delete);

router.delete("/masters/:id", masterController.delete);

router.delete("/orders/:id", orderController.delete);

router.delete("/users/:id", userController.delete);

module.exports = router;