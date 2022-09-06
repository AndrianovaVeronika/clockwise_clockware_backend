const router = require('express').Router();
const userController = require("../../controllers/user.controller");
const authController = require("../../controllers/auth.controller");
const masterController = require("../../controllers/master.controller");
const orderController = require("../../controllers/order.controller");
const {validateIfBodyUndefined, authJwt} = require("../../validators");

router.use(validateIfBodyUndefined);

router.put("/update/credentials", [authJwt.verifyToken], userController.update);

router.put("/rate/order/:id", [authJwt.verifyToken], orderController.rateOrder);

module.exports = router;