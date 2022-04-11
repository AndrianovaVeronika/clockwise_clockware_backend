const router = require('express').Router();
const cityController = require('../../controllers/city.controller');
const masterController = require("../../controllers/master.controller");
const orderController = require("../../controllers/order.controller");
const userController = require("../../controllers/user.controller");

router.put("/cities/:id", cityController.update);

router.put("/masters/:id", masterController.update);

router.put("/orders/:id", orderController.update);

router.put("/users/:id", userController.update);

module.exports = router;