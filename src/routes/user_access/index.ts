import putRouter from "./put.routes";
import getRouter from "./get.routes";
import {Router} from 'express';
import postRouter from "./post.routes";

const router = Router();

router.use('/', putRouter);
router.use('/', getRouter);
router.use('/', postRouter)

export default router;