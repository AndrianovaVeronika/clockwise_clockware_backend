const {City, Order} = require('../models');
const logger = require("../utils/logger");

exports.create = async (req, res) => {
    // Validate request
    logger.info('Creating city...');
    const newCity = {
        name: req.body.name
    };
    logger.info('New City: ');
    for (const cityKey in newCity) {
        logger.info(cityKey + ': ' + newCity[cityKey]);
    }

    // Save in the database
    try {
        const city = await City.create(newCity);
        logger.info('City added');
        res.status(201).send(city);
    } catch (e) {
        logger.info('City add failure');
        res.status(500).send({
            message: e.message || "Some error occurred while creating new city."
        });
    }
};

// Retrieve all from the database.
exports.findAll = async (req, res) => {
    logger.info('Retrieving all cities...');
    try {
        const cities = await City.findAll()
        logger.info('Cities retrieved');
        res.status(200).send(cities);
    } catch (e) {
        logger.info('City find all failure');
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving cities."
        });
    }
};

// Find a single city with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    logger.info(`Finding city with id=${id}...`);
    try {
        const city = await City.findByPk(id)
        if (city) {
            logger.info('City found');
            res.status(200).send(city);
        } else {
            logger.info(`Cannot find City with id=${id}`);
            res.status(404).send({
                message: `Cannot find City with id=${id}.`
            });
        }
    } catch (e) {
        logger.info("Error retrieving Tutorial with id=" + id);
        res.status(500).send({
            message: "Error retrieving city with id=" + id
        });
    }
};

// Update a city by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    logger.info(`Updating city with id=${id}...`);
    try {
        await City.update(req.body, {
            where: {id: id}
        });
        const city = await City.findByPk(id);
        logger.info("City was updated successfully");
        res.status(200).send(city);
    } catch (e) {
        logger.info("Error updating city with id=" + id);
        logger.info(e.message);
        res.status(500).send({
            message: "Error updating city with id=" + id
        });
    }
};

// Delete a city with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    logger.info(`Deleting city with id=${id}...`);
    try {
        await City.destroy({
            where: {id: id}
        });
        await Order.destroy({
            where: {cityId: id}
        });
        logger.info("City was deleted successfully!");
        res.status(200).send({id: id});
    } catch (e) {
        logger.info("Could not delete city with id=" + id);
        logger.info(e.message);
        res.status(500).send({
            message: e.message || "Could not delete city with id=" + id
        });
    }
};