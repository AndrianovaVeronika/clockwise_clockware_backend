const router = require('express').Router();
const orderController = require("../../controllers/order.controller");
const {ifBodyUndefined, orderValidator, userValidator} = require("../../validators");
const masterController = require("../../controllers/master.controller");
const controller = require("../../controllers/auth.controller");
const authController = require("../../controllers/auth.controller");

router.use(ifBodyUndefined);

router.post(
    "/register/user",
    [userValidator.checkDuplicateEmail, userValidator.checkUserName, userValidator.checkUserPassword],
    controller.registerUser
);

router.post(
    "/register/master",
    [userValidator.checkDuplicateEmail, userValidator.checkUserName, userValidator.checkUserPassword],
    controller.registerMaster
)

router.post("/signin", controller.signin);

router.post("/orders",
    [orderValidator.ifDateTimeAppropriate,
        orderValidator.ifOrderInterrogates,
        orderValidator.findUserIdByNameAndEmail],
    orderController.create);

router.post("/masters/available", masterController.findAllMastersAvailable);

router.post('/verify/user/created', authController.createUserOrFindIfAuthorized);

module.exports = router;