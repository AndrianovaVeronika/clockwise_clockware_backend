const {db} = require('../models');
const logger = require("../../utils/logger");
const City = db.city;

exports.create = (req, res) => {
// Validate request
    logger.info('Creating city...');
    if (!req.body) {
        res.status(400).send({message: 'City add failure: body undefined'});
        return;
    }

    const city = {
        name: req.body.name
    };
    logger.info('New City: ');
    for (const cityKey in city) {
        logger.info(cityKey + ': ' + city[cityKey]);
    }

    // Save in the database
    City.create(city)
        .then(data => {
            logger.info('City added');
            res.status(201).send(data);
        })
        .catch(err => {
            logger.info('City add failure');
            res.status(500).send({
                message: err.message || "Some error occurred while creating new city."
            });
        });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
    logger.info('Retrieving all cities...');
    City.findAll()
        .then(data => {
            logger.info('Cities retrieved');
            res.send(data);
        })
        .catch(err => {
            logger.info('City find all failure');
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving cities."
            });
        });
};

// Find a single city with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    logger.info(`Finding city with id=${id}...`);
    City.findByPk(id)
        .then(data => {
            if (data) {
                logger.info('City found');
                res.status(200).send(data);
            } else {
                logger.info(`Cannot find City with id=${id}`);
                res.status(404).send({
                    message: `Cannot find City with id=${id}.`
                });
            }
        })
        .catch(err => {
            logger.info("Error retrieving Tutorial with id=" + id);
            res.status(500).send({
                message: "Error retrieving city with id=" + id
            });
        });
};

// Update a city by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    logger.info(`Updating city with id=${id}...`);

    if (!req.body) {
        logger.info('City update failure: body undefined');
        res.status(400).send({message: 'City update failure: body undefined'});
        return;
    }

    City.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            logger.info("City was updated successfully");
            res.status(200).send({
                message: "City was updated successfully"
            });
        })
        .catch(err => {
            logger.info("Error updating city with id=" + id);
            logger.info(err.message);
            res.status(500).send({
                message: "Error updating city with id=" + id
            });
        });
};

// Delete a city with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    logger.info(`Deleting city with id=${id}...`);

    City.destroy({
        where: { id: id }
    })
        .then(num => {
            logger.info("City was deleted successfully!");
            res.status(200).send({
                message: "City was deleted successfully!"
            });
        })
        .catch(err => {
            logger.info("Could not delete city with id=");
            logger.info(err.message);
            res.status(500).send({
                message: "Could not delete city with id=" + id
            });
        });
};

