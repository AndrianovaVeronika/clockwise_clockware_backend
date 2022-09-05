const router = require('express').Router();
const cityController = require('../../controllers/city.controller');
const masterController = require("../../controllers/master.controller");
const orderController = require("../../controllers/order.controller");
const userController = require("../../controllers/user.controller");
const authController = require("../../controllers/auth.controller");
const priceController = require("../../controllers/price.controller");
const {validateIfBodyUndefined, authJwt} = require("../../validators");
const {ifOrderBelongToMaster} = require("../../validators/ifOrderBelongToMaster");

router.use(validateIfBodyUndefined);

router.put("/master/orders/:id", [authJwt.verifyToken, authJwt.isMaster, ifOrderBelongToMaster], orderController.update);

module.exports = router;