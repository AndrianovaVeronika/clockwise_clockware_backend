const {verifySignUp, authJwt, validateIfBodyUndefined} = require("../../validators");
const controller = require("../../controllers/auth.controller");
const router = require('express').Router();

router.post(
    "/signup",
    [
        validateIfBodyUndefined,
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);

router.post("/signin", [validateIfBodyUndefined], controller.signin);

router.get('/check', [authJwt.verifyToken], controller.userBoard);

module.exports = router;