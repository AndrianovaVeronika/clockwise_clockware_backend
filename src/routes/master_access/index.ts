import getRouter from "./get.routes";
import putRouter from "./put.routes";
import {Router} from 'express';

const router = Router();

router.use('/', getRouter);
router.use('/', putRouter);

export default router;