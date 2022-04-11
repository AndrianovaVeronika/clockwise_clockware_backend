const userController = require("../../controllers/user.controller");
const router = require('express').Router();

router.get("/users", userController.findAll);

module.exports = router;