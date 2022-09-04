const router = require('express').Router();
const getRouter = require('./get.routes');

router.use('/', getRouter);

module.exports = router;