const mastersRouter = require('./masters');
const ordersRouter = require('./orders');
const citiesRouter = require('./cities');
const express = require("express");
const router = express.Router();

router.use(mastersRouter, ordersRouter, citiesRouter);

module.exports = router;