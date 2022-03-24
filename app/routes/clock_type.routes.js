const controller = require("../controllers/clockType.controller");
const router = require('express').Router();

router.get("/", controller.findAll);

module.exports = router;