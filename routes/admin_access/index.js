const router = require('express').Router();
const deleteRouter = require('./delete.routes');
const getRouter = require('./get.routes');
const postRouter = require('./post.routes');
const putRouter = require('./put.routes');
const {authJwt} = require('../../validators');

router.use(authJwt.verifyToken);
router.use(authJwt.isAdmin);

router.use('/', deleteRouter);
router.use('/', getRouter);
router.use('/', postRouter);
router.use('/', putRouter);

module.exports = router;