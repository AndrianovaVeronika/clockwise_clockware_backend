import * as userController from "../../controllers/user";
// import * as masterController from "../../controllers/master";
// import * as cityController from "../../controllers/city";
// import * as authController from "../../controllers/auth";
// import * as clockTypeController from "../../controllers/clockType";
import * as orderController from "../../controllers/order";
import {Router} from 'express';
import ifBodyUndefined from "../../validators/ifBodyUndefined";
import validatePasswordChange from "../../validators/validatePasswordChange";

const router = Router();

router.put("/update/credentials", [
    ifBodyUndefined,
    validatePasswordChange
], userController.update);

router.put("/rate/order/:id", [
    ifBodyUndefined
], orderController.rateOrder);

export default router;