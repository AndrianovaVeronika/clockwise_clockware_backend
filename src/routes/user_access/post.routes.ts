// import * as userController from "../../controllers/user";
// import * as masterController from "../../controllers/master";
import * as cityController from "../../controllers/city";
// import * as authController from "../../controllers/auth";
// import * as clockTypeController from "../../controllers/clockType";
// import * as orderController from "../../controllers/order";
import {Router} from 'express';
import ifBodyUndefined from "../../validators/ifBodyUndefined";

const router = Router();

router.post('/filtered/cities', [ifBodyUndefined], cityController.findAll);

export default router;