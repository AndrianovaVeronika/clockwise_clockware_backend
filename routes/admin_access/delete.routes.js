const router = require('express').Router();
const cityController = require('../../controllers/city.controller');
const masterController = require("../../controllers/master.controller");
const orderController = require("../../controllers/order.controller");
const userController = require("../../controllers/user.controller");
const ifOrderAssignedTo = require("../../validators/ifObjectAssignedToOrder");

router.delete("/cities/:id", [ifOrderAssignedTo.city], cityController.delete);

router.delete("/masters/:id", [ifOrderAssignedTo.master], masterController.delete);

router.delete("/orders/:id", orderController.delete);

router.delete("/users/:id", [ifOrderAssignedTo.user], userController.delete);

module.exports = router;