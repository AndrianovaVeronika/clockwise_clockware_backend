// import * as userController from "../../controllers/user";
// import * as cityController from "../../controllers/city";
import * as authController from "../../controllers/auth";
// import * as clockTypeController from "../../controllers/clockType";
import * as orderController from "../../controllers/order";
import {Router} from 'express';
import ifBodyUndefined from "../../validators/ifBodyUndefined";
import {checkDuplicateEmail, checkUserName, checkUserPassword} from "../../validators/user.validator";
import {ifDateTimeAppropriate, ifOrderInterrogates} from "../../validators/order.validator";

const router = Router();

router.post(
    "/register/user",
    [
        ifBodyUndefined,
        checkDuplicateEmail,
        checkUserName,
        checkUserPassword
    ],
    authController.registerUser
);

router.post(
    "/register/master",
    [
        ifBodyUndefined,
        checkDuplicateEmail,
        checkUserName,
        checkUserPassword
    ],
    authController.registerMaster
);

router.post("/signin", [
    ifBodyUndefined
], authController.signin);

router.post("/orders",
    [
        ifBodyUndefined,
        ifDateTimeAppropriate,
        ifOrderInterrogates
    ],
    orderController.create
);

router.post('/verify/user/created', [
    ifBodyUndefined
], authController.createUserOrFindIfAuthorized);

export default router;