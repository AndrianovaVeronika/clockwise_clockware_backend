const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const {db} = require("../models");
const User = db.user;
const logger = require('../../utils/logger');

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
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
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
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
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};

module.exports = authJwt;