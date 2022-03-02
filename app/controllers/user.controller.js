const logger = require("../../utils/logger");
const {db} = require('../models');
const User = db.user;
const Order = db.order;

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

// Update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    logger.info(`Updating user with id=${id}...`);
    if (!req.body) {
        logger.info('User update failure: body undefined');
        res.status(400).send({message: 'User update failure: body undefined'});
        return;
    }

    User.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            logger.info("User was updated successfully");
            res.status(200).send({
                message: "User was updated successfully"
            });
        })
        .catch(err => {
            logger.info("Error updating user with id=" + id);
            logger.info(err.message);
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    logger.info(`Deleting user with id=${id}...`);

    User.destroy({
        where: {id: id}
    })
        .then(id => {
            Order.destroy({
                where: {userId: id}
            })
            logger.info("User was deleted successfully!");
            res.status(200).send({
                message: "User was deleted successfully!"
            });
        })
        .catch(err => {
            logger.info("Could not delete user with id=");
            logger.info(err.message);
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};