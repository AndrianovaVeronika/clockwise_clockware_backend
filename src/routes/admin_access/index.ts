import {Router} from 'express';
import {isAdmin} from "../../validators/roles.validator";
import deleteRouter from "./delete.routes";
import getRouter from "./get.routes";
import postRouter from "./post.routes";
import putRouter from "./put.routes";

const router = Router();

router.use(isAdmin);

router.use('/', deleteRouter);
router.use('/', getRouter);
router.use('/', postRouter);
router.use('/', putRouter);

export default router;