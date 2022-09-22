// import * as userController from "../../controllers/user";
// import * as masterController from "../../controllers/master";
// import * as cityController from "../../controllers/city";
// import * as authController from "../../controllers/auth";
// import * as clockTypeController from "../../controllers/clockType";
import * as orderController from "../../controllers/order";
import {Router} from 'express';
import verifyTokenAndExtractUserId from "../../validators/verifyTokenAndExtractUserId";
import ifBodyUndefined from "../../validators/ifBodyUndefined";

const router = Router();

router.use(ifBodyUndefined);

router.get('/current_user/orders',
    [verifyTokenAndExtractUserId],
    orderController.findAllCurrentUserOrders);

export default router;