// import * as userController from "../../controllers/user";
import * as masterController from "../../controllers/master";
// import * as cityController from "../../controllers/city";
import * as authController from "../../controllers/auth";
// import * as clockTypeController from "../../controllers/clockType";
import * as orderController from "../../controllers/order";
import {Router} from 'express';
import ifBodyUndefined from "../../validators/ifBodyUndefined";
import {checkDuplicateEmail, checkUserName, checkUserPassword} from "../../validators/user.validator";
import {ifDateTimeAppropriate, ifOrderInterrogates} from "../../validators/order.validator";

const router = Router();

router.use(ifBodyUndefined);

router.post(
    "/register/user",
    [checkDuplicateEmail, checkUserName, checkUserPassword],
    authController.registerUser
);

router.post(
    "/register/master",
    [checkDuplicateEmail, checkUserName, checkUserPassword],
    authController.registerMaster
)

router.post("/signin", authController.signin);

router.post("/orders",
    [ifDateTimeAppropriate, ifOrderInterrogates],
    orderController.create);

router.post("/masters/available", masterController.findAllMastersAvailable);

router.post('/verify/user/created', authController.createUserOrFindIfAuthorized);

export default router;