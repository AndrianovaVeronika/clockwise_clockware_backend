const logger = require("../../utils/logger");
const {db} = require('../models');
const ClockType = db.clock_type;

exports.findAll = (req, res) => {
    logger.info('Retrieving all clock_types...');
    ClockType.findAll()
        .then(data => {
            logger.info('Clock_types retrieved');
            res.send(data);
        })
        .catch(err => {
            logger.info('Clock_types find all: failure');
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving clock_types."
            });
        });
};