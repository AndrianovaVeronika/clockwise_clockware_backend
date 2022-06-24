const router = require('express').Router();
const getRouter = require('./get.routes');
const postRouter = require('./post.routes');
const authRouter = require('./auth.routes');

router.use('/', getRouter);
router.use('/', postRouter);
router.use('/auth', authRouter);

module.exports = router;