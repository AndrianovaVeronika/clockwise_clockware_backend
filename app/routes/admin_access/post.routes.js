const router = require('express').Router();
const cityController = require('../../controllers/city.controller');
const masterController = require("../../controllers/master.controller");
const orderController = require("../../controllers/order.controller");

router.post("/cities", cityController.create);

router.post("/masters", masterController.create);

router.post("/orders", orderController.create);

module.exports = router;