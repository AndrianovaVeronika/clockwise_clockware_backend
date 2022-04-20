const logger = require("../utils/logger");
const db = require('../models');
const ClockType = db.ClockType;

exports.findAll = async (req, res) => {
    logger.info('Retrieving all clock_types...');
    try {
        const clockTypes = await ClockType.findAll();
        logger.info('Clock_types retrieved');
        res.send(clockTypes);
    } catch (e) {
        logger.info('Clock_types find all: failure');
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving clock_types."
        });
    }
};