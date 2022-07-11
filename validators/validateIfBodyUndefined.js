const logger = require("../utils/logger");

validateIfBodyUndefined = async (req, res, next) => {
    logger.info("Validating body if undefined...");
    if (!req?.body) {
        logger.error("Body undefined!");
        res.status(400).send({message: "Body undefined!"});
        return;
    }
    logger.info("Body is defined. Heading next...");
    next();
}

module.exports = validateIfBodyUndefined;