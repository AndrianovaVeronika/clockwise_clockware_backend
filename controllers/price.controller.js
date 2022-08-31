const {City, Price} = require("../models");
const logger = require("../utils/logger");

const addCityFieldToPrice = price => ({
    id: price.id,
    sum: price.sum,
    city: price.City.name
});

exports.create = async (req, res) => {
    logger.info("Creating price...");
    const newPrice = {
        sum: req.body.sum,
        cityId: req.body.cityId
    };
    try {
        const price = await Price.create(newPrice);
        price.City = await price.getCity();
        logger.info("Price created!");
        return res.status(201).send(addCityFieldToPrice(price));
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Retrieve all from the database.
exports.findAll = async (req, res) => {
    logger.info("Retrieving all prices...");
    try {
        const prices = await Price.findAll({include: [City]});
        logger.info("Prices retrieved!");
        return res.status(200).send(prices.map(addCityFieldToPrice));
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Find a single city with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    logger.info(`Finding price with id=${id}...`);
    try {
        const price = await Price.findByPk(id, {include: [City]});
        if (!price) {
            logger.error(`Cannot find price with id=${id}.`);
            return res.status(400).send({
                message: `Cannot find price with id=${id}.`
            });
        }
        logger.info("Price found!");
        return res.status(200).send(addCityFieldToPrice(price));
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Update a city by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    logger.info(`Updating price with id=${id}...`);
    try {
        await Price.update(req.body, {
            where: {id: id}
        });
        const price = await Price.findByPk(id, {include: [City]});
        logger.info("Price has been updated successfully.");
        return res.status(200).send(addCityFieldToPrice(price));
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Delete a city with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    logger.info(`Deleting price with id=${id}...`);
    try {
        await Price.destroy({
            where: {id: id}
        });
        logger.info("Price has been deleted successfully.");
        return res.status(200).send({id: id});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};