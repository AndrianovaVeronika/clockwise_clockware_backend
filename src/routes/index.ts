import {Router} from 'express';
import allRoutes from "./all_access";
import userRoutes from "./user_access";
import masterRoutes from "./master_access";
import adminRoutes from "./admin_access";
import verifyTokenAndExtractUserId from "../validators/verifyTokenAndExtractUserId";

const router = Router();

router.use('/', allRoutes);

router.use(verifyTokenAndExtractUserId);

//routes
router.use('/', userRoutes);
router.use('/', masterRoutes);
router.use('/', adminRoutes);

export default router;