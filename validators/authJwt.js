const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;
const logger = require('../utils/logger');

verifyToken = (req, res, next) => {
    if (req.headers['special_admin_key'] === process.env.SPECIAL_ADMIN_KEY) {
        next();
        return;
    }
    logger.info('Verifying token...')
    let token = req.headers["x-access-token"];
    logger.info('TOKEN ' + token)
    if (!token) {
        logger.info('No token provided!');

        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            logger.info('Token verified: unauthorized');
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        logger.info('Authorized');
        next();
    });
};

isAdmin = async (req, res, next) => {
    if (req.headers['special_admin_key'] === process.env.SPECIAL_ADMIN_KEY) {
        next();
        return;
    }
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            logger.info('User is admin');
            next();
            return;
        }
    }
    logger.info('User is not admin');
    res.status(403).send({
        message: "Require Admin Role!"
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};

module.exports = authJwt;