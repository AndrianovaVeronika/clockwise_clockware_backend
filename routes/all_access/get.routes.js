const router = require('express').Router();
const cityController = require("../../controllers/city.controller");
const clockTypeController = require("../../controllers/clockType.controller");
const masterController = require("../../controllers/master.controller");
const {verifyTokenAndExtractUserId} = require("../../validators");
const authController = require("../../controllers/auth.controller");

router.get("/cities", cityController.findAll);
router.get("/cities/:id", cityController.findOne);

router.get("/clocktypes", clockTypeController.findAll);

router.get("/masters", masterController.findAll);
router.get("/masters/:id", masterController.findOne);

router.get('/access/user', [verifyTokenAndExtractUserId], authController.userAccess);
router.get('/verify/email/:code', authController.checkEmailVerificationCode);

module.exports = router;