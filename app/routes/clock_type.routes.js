const controller = require("../controllers/clock_type.controller");
const router = require('express').Router();

module.exports = app => {
    router.get("/", controller.findAll);

    app.use('/api/clock_types', router);
};