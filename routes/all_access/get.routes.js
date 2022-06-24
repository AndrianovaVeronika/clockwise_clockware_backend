const router = require('express').Router();
const cityController = require("../../controllers/city.controller");
const clockTypeController = require("../../controllers/clockType.controller");
const masterController = require("../../controllers/master.controller");
const orderController = require("../../controllers/order.controller");

router.get("/cities", cityController.findAll);
router.get("/cities/:id", cityController.findOne);

router.get("/clocktypes", clockTypeController.findAll);

router.get("/masters", masterController.findAll);
router.get("/masters/:id", masterController.findOne);

module.exports = router;