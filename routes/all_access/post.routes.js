const router = require('express').Router();
const orderController = require("../../controllers/order.controller");
const {validateIfBodyUndefined, orderValidators, verifySignUp, checkUserData} = require("../../validators");
const masterController = require("../../controllers/master.controller");
const controller = require("../../controllers/auth.controller");
const authController = require("../../controllers/auth.controller");

router.use(validateIfBodyUndefined);

router.post(
    "/register/user",
    [checkUserData.checkDuplicateEmail, checkUserData.checkUserName, checkUserData.checkUserPassword],
    controller.registerUser
);

router.post(
    "/register/master",
    [checkUserData.checkDuplicateEmail, checkUserData.checkUserName, checkUserData.checkUserPassword],
    controller.registerMaster
)

router.post("/signin", controller.signin);

router.post("/orders", orderValidators, orderController.create);
router.post("/masters/available", masterController.findAllMastersAvailable);

router.post('/verify/user/created', authController.isUserCreated);

module.exports = router;