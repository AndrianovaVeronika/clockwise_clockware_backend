const {verifySignUp, authJwt} = require("../../validators");
const controller = require("../../controllers/auth.controller");
const router = require('express').Router();

router.post(
    "/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);

router.post("/signin", controller.signin);

router.get('/check', [authJwt.verifyToken], controller.userBoard);

module.exports = router;