import * as userController from "../../controllers/user";
import * as masterController from "../../controllers/master";
import * as cityController from "../../controllers/city";
// import * as authController from "../../controllers/auth";
// import * as clockTypeController from "../../controllers/clockType";
// import * as orderController from "../../controllers/order";
import {Router} from 'express';
import ifBodyUndefined from "../../validators/ifBodyUndefined";
import {checkDuplicateEmail, checkUserName, checkUserPassword} from "../../validators/user.validator";

const router = Router();

router.post("/cities", [
    ifBodyUndefined
], cityController.create);

router.post("/masters", [
    ifBodyUndefined,
    checkUserName,
    checkDuplicateEmail
], masterController.create);

router.post("/users", [
    ifBodyUndefined,
    checkDuplicateEmail,
    checkUserName,
    checkUserPassword
], userController.create);

export default router;