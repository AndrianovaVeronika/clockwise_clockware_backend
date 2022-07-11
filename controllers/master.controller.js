const {User, ClockType, Master, City, Order, Sequelize} = require('../models');
const logger = require("../utils/logger");
const moment = require("moment");
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
        logger.info('Master created');
        res.status(201).send({
            id: master.id,
            name: master.name,
            rating: master.rating,
            cities: req.body.cities
        });
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
};

// Retrieve all from the database.
exports.findAll = async (req, res) => {
    logger.info('Retrieving all masters...');
    try {
        const masters = await Master.findAll({
            include: [City],
        });
        logger.info('Masters retrieved');
        res.status(200).send(masters.map(master => {
            return {
                id: master.id,
                name: master.name,
                rating: master.rating,
                cities: master.Cities.map(city => city.name),
            }
        }));
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
};

// Find a single master with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    logger.info(`Finding master with id=${id}...`);
    try {
        const master = await Master.findByPk(id);
        const cities = await master.getCities();
        master.cities = cities.map(city => city.name);
        if (!master) {
            logger.error(`Cannot find master with id=${id}`);
            res.status(404).send({
                message: `Cannot find master with id=${id}.`
            });
            return;
        }
        logger.info('Master has been found');
        res.status(200).send(master);
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
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
            cities: cities.map(city => city.name),
        });
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
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
        logger.info("Master was deleted successfully");
        res.status(200).send({id: id});
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
}

// Return available masters
exports.findAllMastersAvailable = async (req, res) => {
    logger.info('Filtering all available masters...');
    try {
        const newOrder = {
            date: req.body.date,
            time: req.body.time,
            cityId: req.body.cityId,
            clockTypeId: req.body.clockTypeId
        };
        const incomeMasters = await Master.findAll({
            include: [City]
        });
        const masters = incomeMasters.filter(master => {
            for (const city of master.Cities) {
                if (city.id === newOrder.cityId) {
                    return true;
                }
            }
            return false;
        });
        const orders = await Order.findAll({
            include: [User, ClockType, City, Master]
        });

        const ifOrdersInterogates = (newOrderStartTime, newOrderRepairingTime, existingOrderStartTime, existingOrderRepairingTime) => {
            const existingOrderStartTimeInNum = parseInt(existingOrderStartTime.split(':')[0]);
            const newOrderStartTimeInNum = parseInt(newOrderStartTime.split(':')[0]);
            if (newOrderStartTimeInNum < existingOrderStartTimeInNum) {
                if ((newOrderStartTimeInNum + newOrderRepairingTime) < existingOrderStartTimeInNum) {
                    return false;
                }
            } else {
                if (existingOrderStartTimeInNum + existingOrderRepairingTime < newOrderStartTimeInNum) {
                    return false;
                }
            }
            return true;
        }
        const getRepairingHours = (type) => {
            switch (type) {
                case 'small':
                    return 1;
                case 'average':
                    return 2;
                case 'big':
                    return 3;
                default:
                    return 0;
            }
        }

        logger.info('Starting retrieving busy masters...')
        const busyMasters = [];
        for (const order of orders) {
            logger.info('newOrder city id =' + newOrder.cityId + ' existing order city id =' + order.City.id)
            logger.info('newOrder date =' + newOrder.date + ' existing order date =' + order.date)
            if (newOrder.cityId !== order.City.id
                || moment(newOrder.date).format('MM-DD-YYYY') !== moment(order.date).format('MM-DD-YYYY')) {
                continue;
            }

            //if chosed time interogates with existing order time add master to busy masters list
            if (ifOrdersInterogates(newOrder.time, newOrder.clockTypeId, order.time, getRepairingHours(order.ClockType.name))) {
                busyMasters.push(order.Master.name);
            }
        }
        const availableMasters = masters.filter((master) => !busyMasters.includes(master.name));
        logger.info('All available masters have been retrieved');
        res.status(200).send(availableMasters);
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
}