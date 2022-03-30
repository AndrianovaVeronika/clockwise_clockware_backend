const controller = require("../controllers/user.controller");
const {authJwt} = require("../validators");
const router = require('express').Router();

router.get("/", controller.findAll);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);

module.exports = router;