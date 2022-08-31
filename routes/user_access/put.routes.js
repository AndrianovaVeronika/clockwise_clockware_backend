const router = require('express').Router();
const userController = require("../../controllers/user.controller");
const {validateIfBodyUndefined, authJwt} = require("../../validators");

router.use(validateIfBodyUndefined);

router.put("/update/credentials", [authJwt.verifyToken], userController.update);

module.exports = router;