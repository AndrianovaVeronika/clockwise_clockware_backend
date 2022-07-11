const logger = require("../utils/logger");
const db = require("../models");
const ClockType = db.ClockType;

exports.findAll = async (req, res) => {
    logger.info("Retrieving all clocktypes...");
    try {
        const clockTypes = await ClockType.findAll();
        logger.info("Clocktypes retrieved!");
        res.status(200).send(clockTypes);
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
};