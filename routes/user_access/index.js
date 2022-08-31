const router = require('express').Router();
const putRouter = require('./put.routes');

router.use('/', putRouter);

module.exports = router;