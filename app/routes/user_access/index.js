const router = require('express').Router();
const getRouter = require('./get.routes');
const postRouter = require('./post.routes');
const authJwt = require('../../validators/authJwt');

router.use(authJwt.verifyToken);

router.use('/get', getRouter);
router.use('/post', postRouter);

module.exports = router;