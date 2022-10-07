// import * as userController from "../../controllers/user";
import * as masterController from "../../controllers/master";
import * as cityController from "../../controllers/city";
import * as authController from "../../controllers/auth";
import * as clockTypeController from "../../controllers/clockType";
// import * as orderController from "../../controllers/order";
import {Router} from 'express';
import verifyTokenAndExtractUserId from "../../validators/verifyTokenAndExtractUserId";

const router = Router();

router.get("/cities", cityController.findAll);
router.get("/cities/:id", cityController.findByPk);

router.get("/clocktypes", clockTypeController.findAll);

router.get("/masters", masterController.findAll);
router.get("/masters/:id", masterController.findByPk);

router.get('/access/user', [verifyTokenAndExtractUserId], authController.userAccess);
router.get('/verify/email/:code', authController.checkEmailVerificationCode);

export default router;