const {verifySignUp, authJwt} = require("../validators");
const controller = require("../controllers/auth.controller");
const router = require('express').Router();

router.post(
    "/auth/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);

router.post("/auth/signin", controller.signin);

router.get('/test/user', [authJwt.verifyToken], controller.userBoard);

module.exports = router;