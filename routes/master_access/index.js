const router = require('express').Router();
const getRouter = require('./get.routes');
const putRouter = require('./put.routes');

router.use('/', getRouter);
router.use('/', putRouter);

module.exports = router;