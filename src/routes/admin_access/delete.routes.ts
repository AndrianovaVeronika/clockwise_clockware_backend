import {Router} from "express";
import ifObjectAssignedToOrder from "../../validators/ifObjectAssignedToOrder";
import * as cityController from "../../controllers/city";
import * as masterController from "../../controllers/master";
import * as orderController from "../../controllers/order";
import * as userController from "../../controllers/user";

const router = Router();

router.delete("/cities/:id", [ifObjectAssignedToOrder.city], cityController.deleteByPk);

router.delete("/masters/:id", [ifObjectAssignedToOrder.master], masterController.deleteByPk);

router.delete("/orders/:id", orderController.deleteByPk);

router.delete("/users/:id", [ifObjectAssignedToOrder.user], userController.deleteByPk);

export default router;