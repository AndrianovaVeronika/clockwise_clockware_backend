const {City} = require("../models");
const logger = require("../utils/logger");

exports.create = async (req, res) => {
    logger.info("Creating city...");
    const newCity = {
        name: req.body.name
    };
    try {
        const city = await City.create(newCity);
        logger.info("City created!");
        res.status(201).send(city);
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
};

// Retrieve all from the database.
exports.findAll = async (req, res) => {
    logger.info("Retrieving all cities...");
    try {
        const cities = await City.findAll()
        logger.info("Cities retrieved!");
        res.status(200).send(cities);
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
};

// Find a single city with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    logger.info(`Finding city with id=${id}...`);
    try {
        const city = await City.findByPk(id);
        if (!city) {
            logger.error(`Cannot find City with id=${id}.`);
            res.status(400).send({
                message: `Cannot find City with id=${id}.`
            });
        }
        logger.info("City found!");
        res.status(200).send(city);
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
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
        logger.info("City has been updated successfully.");
        res.status(200).send(city);
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
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
        logger.info("City has been deleted successfully.");
        res.status(200).send({id: id});
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
};