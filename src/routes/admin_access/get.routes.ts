import * as userController from "../../controllers/user";
import * as orderController from "../../controllers/order";
// import * as masterController from "../../controllers/master";
// import * as cityController from "../../controllers/city";
// import * as authController from "../../controllers/auth";
// import * as clockTypeController from "../../controllers/clockType";
import {Router} from'express';
const router = Router();

router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);

router.get("/orders", orderController.findAll);
router.get("/orders/:id", orderController.findOne);

export default router;