const router = require('express').Router();
const orderController = require("../../controllers/order.controller");
const {ifOrderExist, validateIfBodyUndefined, validateOrder} = require("../../validators");
const masterController = require("../../controllers/master.controller");
const userController = require("../../controllers/user.controller");

router.use(validateIfBodyUndefined);

router.post("/orders", [validateOrder, ifOrderExist], orderController.create);
router.post("/masters/available", masterController.findAllMastersAvailable);
router.post("/find_or_create_user", userController.findUserOrCreate);

module.exports = router;