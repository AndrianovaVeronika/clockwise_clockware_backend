const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;
const Master = db.Master;
const logger = require("../utils/logger");

verifyToken = (req, res, next) => {
    try {
        logger.info("Verifying user token for access...");
        if (req.headers['special_admin_key'] === process.env.SPECIAL_ADMIN_KEY) {
            logger.info("User provided special admin key. Heading next...");
            next();
            return;
        }
        let token = req.headers["x-access-token"];
        if (!token) {
            logger.error("No token provided!");
            return res.status(400).send({message: "No token provided!"});
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                logger.error("Unauthorized!");
                return res.status(401).send({message: "Unauthorized!"});
            }
            req.userId = decoded.id;
            logger.info("Authorized! Heading next...");
            next();
        });
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

isAdmin = async (req, res, next) => {
    try {
        logger.info("Checking if user admin...");
        if (req.headers['special_admin_key'] === process.env.SPECIAL_ADMIN_KEY) {
            logger.info("User provided special admin key. Heading next...");
            next();
            return;
        }
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                logger.info("User is admin.");
                next();
                return;
            }
        }
        logger.info("Require Admin Role!");
        return res.status(403).send({message: "Require Admin Role!"});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

isMaster = async (req, res, next) => {
    try {
        logger.info("Checking if user master...");
        // if (req.headers['special_admin_key'] === process.env.SPECIAL_ADMIN_KEY) {
        //     logger.info("User provided special admin key. Heading next...");
        //     next();
        //     return;
        // }
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'master') {
                logger.info("User is master.");
                const master = await Master.findOne({where: {userId: user.id}});
                req.masterId = master.id;
                next();
                return;
            }
        }
        logger.info("Require master Role!");
        return res.status(403).send({message: "Require master Role!"});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isMaster: isMaster
};

module.exports = authJwt;