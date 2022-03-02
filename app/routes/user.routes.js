const controller = require("../controllers/user.controller");
const router = require('express').Router();

module.exports = function (app) {
    router.get("/", controller.findAll);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    app.use('/api/users', router);
};