const {Master, City, Order, Sequelize} = require('../models');
const logger = require("../utils/logger");
const Op = Sequelize.Op;

exports.create = async (req, res) => {
// Validate request
    logger.info('Creating master...');
    const newMaster = {
        name: req.body.name,
        rating: req.body.rating
    };
    try {
        // Save in the database
        const master = await Master.create(newMaster);
        const cities = await City.findAll({
            where: {
                name: {
                    [Op.or]: req.body.cities
                }
            }
        })
        await master.setCities(cities);
        logger.info('Master added');
        master.cities = cities.map(city => {
            return {
                id: city.id,
                name: city.name
            }
        });
        res.status(201).send(master);
    } catch (e) {
        logger.info('Master add failure');
        res.status(500).send({
            message: e.message || "Some error occurred while creating new master."
        });
    }
};

// Retrieve all from the database.
exports.findAll = async (req, res) => {
    try {
        logger.info('Retrieving all masters...');
        const masters = await Master.findAll({
            include: [City],
        });
        logger.info('Masters retrieved');
        if (masters) {
            const mastersList = masters.map(master => {
                return {
                    id: master.id,
                    name: master.name,
                    rating: master.rating,
                    cities: master.Cities.map(city => {
                        return {
                            id: city.id,
                            name: city.name
                        }
                    }),
                }
            });
            res.send(mastersList);
        }
    } catch (e) {
        logger.info('Master find all: failure');
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving masters."
        });
    }
};

// Find a single master with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    logger.info(`Finding master with id=${id}...`);
    try {
        const master = await Master.findByPk(id);
        const cities = await master.getCities();
        master.cities = cities.map(city => {
            return {
                id: city.id,
                name: city.name
            }
        });
        if (master) {
            logger.info('Master found');
            res.status(200).send(master);
        } else {
            logger.info(`Cannot find master with id=${id}`);
            res.status(404).send({
                message: `Cannot find master with id=${id}.`
            });
        }
    } catch (e) {
        logger.info("Error retrieving master with id=" + id);
        res.status(500).send({
            message: "Error retrieving master with id=" + id
        });
    }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    logger.info(`Updating master with id=${id}...`);
    try {
        await Master.update(req.body, {
            where: {id: id}
        });
        const master = await Master.findByPk(id);
        const cities = await City.findAll({
            where: {
                name: {
                    [Op.or]: req.body.cities
                }
            }
        })
        await master.setCities(cities);
        logger.info("Master was updated successfully");
        res.status(200).send({
            id: master.id,
            name: master.name,
            rating: master.rating,
            cities: cities.map(city => {
                return {
                    id: city.id,
                    name: city.name
                }
            }),
        });
    } catch (e) {
        logger.info("Error updating master with id=" + id);
        logger.info(e.message);
        res.status(500).send({
            message: "Error updating master with id=" + id
        });
    }
};

// Delete a master with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    logger.info(`Deleting master with id=${id}...`);
    try {
        await Master.destroy({
            where: {id: id}
        });
        await Order.destroy({
            where: {masterId: id}
        });
        logger.info("Master was deleted successfully!");
        res.status(200).send({id: id});
    } catch
        (e) {
        logger.info("Could not delete master with id=");
        logger.info(e.message);
        res.status(500).send({
            message: e.message || "Could not delete master with id=" + id
        });
    }
}