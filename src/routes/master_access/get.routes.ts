// import * as userController from "../../controllers/user";
// import * as masterController from "../../controllers/master";
// import * as cityController from "../../controllers/city";
// import * as authController from "../../controllers/auth";
// import * as clockTypeController from "../../controllers/clockType";
import * as orderController from "../../controllers/order";
import {Router} from 'express';
import {isMaster} from "../../validators/roles.validator";

const router = Router();

router.get('/current_master/orders',
    [isMaster],
    orderController.findAllCurrentMasterOrders);

export default router;