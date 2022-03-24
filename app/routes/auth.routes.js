const {verifySignUp, authJwt} = require("../middleware");
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

router.get(
    "/test/user",
    [authJwt.verifyToken],
    controller.userBoard
);

router.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
);

module.exports = router;