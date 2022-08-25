const router = require('express').Router();
const cityController = require('../../controllers/city.controller');
const masterController = require("../../controllers/master.controller");
const orderController = require("../../controllers/order.controller");
const userController = require("../../controllers/user.controller");
const authController = require("../../controllers/auth.controller");
const {validateIfBodyUndefined} = require("../../validators");

router.use(validateIfBodyUndefined);

router.put("/cities/:id", cityController.update);
router.put("/masters/:id", masterController.update);
router.put("/orders/:id", orderController.update);
router.put("/users/:id", userController.update);

router.put("/reset/password", authController.resetPassword);

module.exports = router;