const logger = require("../../utils/logger");
const {db} = require('../models');
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send('all access');
};
exports.userBoard = (req, res) => {
    const id = req.userId;
    logger.info(`Finding user with id=${id}...`);
    User.findByPk(id)
        .then(data => {
            if (data) {
                logger.info('User found');
                res.status(200).send(data);
            } else {
                logger.info(`Cannot find user with id=${id}`);
                res.status(404).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        })
        .catch(err => {
            logger.info("Error retrieving user with id=" + id);
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
};
exports.adminBoard = (req, res) => {
    res.status(200).send("admin access");
};