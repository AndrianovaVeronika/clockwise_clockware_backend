const router = require('express').Router();
const orderController = require("../../controllers/order.controller");
const {validateIfBodyUndefined, orderValidators, verifySignUp} = require("../../validators");
const masterController = require("../../controllers/master.controller");
const controller = require("../../controllers/auth.controller");

router.use(validateIfBodyUndefined);

router.post(
    "/register/user",
    [
        verifySignUp.checkDuplicateEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.registerUser
);

router.post(
    "/register/master",
    [
        verifySignUp.checkDuplicateEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.registerMaster
)

router.post("/signin", controller.signin);

router.post("/orders", orderValidators, orderController.create);
router.post("/masters/available", masterController.findAllMastersAvailable);

module.exports = router;