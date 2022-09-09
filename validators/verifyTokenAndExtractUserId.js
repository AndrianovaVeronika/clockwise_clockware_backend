const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyTokenAndExtractUserId = (req, res, next) => {
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

module.exports = verifyTokenAndExtractUserId;