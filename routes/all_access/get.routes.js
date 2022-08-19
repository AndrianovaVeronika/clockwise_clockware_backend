const router = require('express').Router();
const cityController = require("../../controllers/city.controller");
const clockTypeController = require("../../controllers/clockType.controller");
const masterController = require("../../controllers/master.controller");
const {authJwt} = require("../../validators");
const authController = require("../../controllers/auth.controller");
const userController = require("../../controllers/user.controller");

router.get("/cities", cityController.findAll);
router.get("/cities/:id", cityController.findOne);

router.get("/clocktypes", clockTypeController.findAll);

router.get("/masters", masterController.findAll);
router.get("/masters/:id", masterController.findOne);

router.get('/auth/checktocken', [authJwt.verifyToken], authController.userAccess);
router.get('/verify/email/:code', authController.checkEmailVerificationCode);


module.exports = router;