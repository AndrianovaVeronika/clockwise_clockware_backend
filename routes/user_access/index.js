const router = require('express').Router();
const putRouter = require('./put.routes');
const getRouter = require('./get.routes');

router.use('/', putRouter);
router.use('/', getRouter);

module.exports = router;