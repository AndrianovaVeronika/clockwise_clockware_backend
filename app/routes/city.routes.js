const controller = require("../controllers/city.controller");
const {authJwt} = require("../validators");
const router = require('express').Router();

router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.post("/", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);

module.exports = router;