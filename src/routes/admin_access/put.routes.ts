import * as userController from "../../controllers/user";
import * as masterController from "../../controllers/master";
import * as cityController from "../../controllers/city";
import * as authController from "../../controllers/auth";
// import * as clockTypeController from "../../controllers/clockType";
import * as orderController from "../../controllers/order";
import {Router} from 'express';
import ifBodyUndefined from "../../validators/ifBodyUndefined";

const router = Router();

router.put("/cities/:id", [ifBodyUndefined], cityController.update);
router.put("/masters/:id", [ifBodyUndefined], masterController.update);
router.put("/orders/:id", [ifBodyUndefined], orderController.update);
router.put("/users/:id", [ifBodyUndefined], userController.update);
router.put("/reset/password/:id", authController.resetPassword);

export default router;