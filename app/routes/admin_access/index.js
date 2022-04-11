const router = require('express').Router();
const deleteRouter = require('./delete.routes');
const getRouter = require('./get.routes');
const postRouter = require('./post.routes');
const putRouter = require('./put.routes');
const authJwt = require('../../validators/authJwt');

router.use(authJwt.verifyToken);
router.use(authJwt.isAdmin);

router.use('/delete', deleteRouter);
router.use('/get', getRouter);
router.use('/post', postRouter);
router.use('/put', putRouter);

module.exports = router;