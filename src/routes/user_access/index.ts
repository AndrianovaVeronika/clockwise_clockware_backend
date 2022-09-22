import putRouter from "./put.routes";
import getRouter from "./get.routes";
import {Router} from 'express';

const router = Router();

router.use('/', putRouter);
router.use('/', getRouter);

export default router;