const controller = require("../controllers/city.controller");
const router = require('express').Router();

module.exports = app => {
    router.get("/", controller.findAll);
    router.get("/:id", controller.findOne);
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    app.use('/api/cities', router);
};