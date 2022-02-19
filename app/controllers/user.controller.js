const logger = require("../../utils/logger");
const {db} = require('../models');
const User = db.user;

exports.findAll = (req, res) => {
    logger.info('Retrieving all users...');
    User.findAll()
        .then(data => {
            logger.info('Users retrieved');
            res.status(200).send(data);
        })
        .catch(err => {
            logger.info('User find all: failure');
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users"
            });
        });
};
