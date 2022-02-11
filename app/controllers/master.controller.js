const {db} = require('../models');
const logger = require("../../utils/logger");
const Master = db.master;
const City = db.city;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
// Validate request
    logger.info('Creating master...');
    if (!req.body) {
        res.status(400).send({message: 'Master add failure: body undefined'});
        return;
    }

    const master = {
        name: req.body.name,
        rating: req.body.rating
    };

    logger.info('New master: ');
    for (const masterKey in master) {
        logger.info(masterKey + ': ' + master[masterKey]);
    }

    // Save in the database
    Master.create(master)
        .then(master => {
            City.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.cities
                    }
                }
            }).then(cities => {
                master.setCities(cities).then(() => {
                    logger.info('Master added');
                    res.status(201).send({message: "User was registered successfully!"});
                })
            })
        })
        .catch(err => {
            logger.info('Master add failure');
            res.status(500).send({
                message: err.message || "Some error occurred while creating new master."
            });
        });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
    logger.info('Retrieving all masters...');
    Master.findAll({
        include: db.city
    })
        .then(data => {
            logger.info('Masters retrieved');
            res.send(data);
        })
        .catch(err => {
            logger.info('Master find all: failure');
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving masters."
            });
        });
};

// Find a single master with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    logger.info(`Finding master with id=${id}...`);
    Master.findByPk(id)
        .then(data => {
            if (data) {
                logger.info('Master found');
                res.status(200).send(data);
            } else {
                logger.info(`Cannot find master with id=${id}`);
                res.status(404).send({
                    message: `Cannot find master with id=${id}.`
                });
            }
        })
        .catch(err => {
            logger.info("Error retrieving master with id=" + id);
            res.status(500).send({
                message: "Error retrieving master with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    logger.info(`Updating master with id=${id}...`);

    if (!req.body) {
        logger.info('Master update failure: body undefined');
        res.status(400).send({message: 'Master update failure: body undefined'});
        return;
    }

    Master.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                logger.info("Master was updated successfully");
                res.status(200).send({
                    message: "Master was updated successfully"
                });
            } else {
                logger.info(`Cannot update master with id=${id}!`);
                res.status(200).send({
                    message: `Cannot update master with id=${id}!`
                });
            }
        })
        .catch(err => {
            logger.info("Error updating master with id=" + id);
            logger.info(err.message);
            res.status(500).send({
                message: "Error updating master with id=" + id
            });
        });
};

// Delete a master with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    logger.info(`Deleting master with id=${id}...`);

    Master.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                logger.info("Master was deleted successfully!");
                res.status(200).send({
                    message: "Master was deleted successfully!"
                });
            } else {
                logger.info(`Cannot delete master with id=${id}. Maybe master was not found!`);
                res.status(200).send({
                    message: `Cannot delete master with id=${id}. Maybe master was not found!`
                });
            }
        })
        .catch(err => {
            logger.info("Could not delete master with id=");
            logger.info(err.message);
            res.status(500).send({
                message: "Could not delete master with id=" + id
            });
        });
};