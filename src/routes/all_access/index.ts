import getRouter from "./get.routes";
import postRouter from "./post.routes";
import {Router} from 'express';

const router = Router();

router.use('/', getRouter);
router.use('/', postRouter);

export default router;