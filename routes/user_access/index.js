const router = require('express').Router();
const getRouter = require('./get.routes');
const postRouter = require('./post.routes');
const authJwt = require('../../validators/authJwt');

router.use(authJwt.verifyToken);

router.use('/', getRouter);
router.use('/', postRouter);

module.exports = router;