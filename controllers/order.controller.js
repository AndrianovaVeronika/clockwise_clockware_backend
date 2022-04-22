const db = require('../models');
const logger = require("../utils/logger");
const {sendMail} = require("../services/mail.service");
const Order = db.Order;
const User = db.User;
const City = db.City;
const ClockType = db.ClockType;
const Master = db.Master;

exports.create = async (req, res) => {
// Validate request
    logger.info('Creating order...');
    if (!req.body) {
        res.status(400).send({message: 'Order add failure: body undefined'});
        return;
    }
    const order = {
        date: req.body.date,
        time: req.body.time,
        userId: req.body.userId,
        cityId: req.body.cityId,
        clockTypeId: req.body.clockTypeId,
        masterId: req.body.masterId
    };
    logger.info('New order: ');
    for (const orderKey in order) {
        logger.info(orderKey + ': ' + order[orderKey]);
    }

    try {
        // Save in the database
        await Order.create(order);
        logger.info('Order `ve been added');

        const user = await User.findByPk(order.userId);
        const city = await City.findByPk(order.cityId);
        const clockType = await ClockType.findByPk(order.clockTypeId);
        const master = await Master.findByPk(order.masterId);
        logger.info('Building up mail...')
        const mailData = {
            username: user.username,
            email: user.email,
            clockType: clockType.name,
            master: master.name,
            city: city.name,
            date: order.date,
            time: order.time
        };
        let mail = '';
        for (const key in mailData) {
            logger.info(key + ': ' + mailData[key]);
            mail += '\n' + key + ': ' + mailData[key];
        }
        await sendMail({
            to: mailData.email,
            subject: 'Order `ve been registered successfully',
            text: 'Your order: ' + mail,
        })
        logger.info('Mail `ve been sent');
        res.status(201).send({
            message: 'Order `ve been registered successfully'
        });
    } catch (e) {
        logger.info('Order add failure');
        res.status(500).send({
            message: e.message || "Some error occurred while creating new order."
        });
    }
};

// Retrieve all from the database.
exports.findAll = async (req, res) => {
    logger.info('Retrieving all orders...');
    try {
        const orders = await Order.findAll({
            include: [User, ClockType, City, Master]
        });
        logger.info('Orders retrieved');
        const processedData = orders.map(order => {
            return {
                id: order.id,
                date: order.date,
                time: order.time,
                username: order.User.username,
                email: order.User.email,
                clockType: order.ClockType.name,
                city: order.City.name,
                master: order.Master.name
            }
        });
        res.status(200).send(processedData);
    } catch (e) {
        logger.info('Order find all: failure');
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving orders."
        });
    }
};

// Find a single order with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    logger.info(`Finding order with id=${id}...`);
    try {
        const order = await Order.findByPk(id);
        if (order) {
            logger.info('Order found');
            res.status(200).send(order);
        } else {
            logger.info(`Cannot find order with id=${id}`);
            res.status(404).send({
                message: `Cannot find order with id=${id}.`
            });
        }
    } catch (e) {
        logger.info("Error retrieving order with id=" + id);
        res.status(500).send({
            message: e.message || "Error retrieving order with id=" + id
        });
    }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    logger.info(`Updating order with id=${id}...`);
    if (!req.body) {
        logger.info('Order update failure: body undefined');
        res.status(400).send({message: 'Order update failure: body undefined'});
        return;
    }

    try {
        await Order.update(req.body, {
            where: {id: id}
        });
        logger.info("Order was updated successfully");
        res.status(200).send({
            message: "Order was updated successfully"
        });
    } catch (e) {
        logger.info("Error updating order with id=" + id);
        logger.info(e.message);
        res.status(500).send({
            message: "Error updating order with id=" + id
        });
    }
};

// Delete an order with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    logger.info(`Deleting order with id=${id}...`);

    try {
        const num = await Order.destroy({
            where: {id: id}
        });
        logger.info('num? ' + num);
        if (num === 1) {
            logger.info("Order was deleted successfully!");
            res.status(200).send({
                message: "Order was deleted successfully!"
            });
        } else {
            logger.info(`Cannot delete order with id=${id}. Maybe order was not found!`);
            res.status(200).send({
                message: `Cannot delete order with id=${id}. Maybe order was not found!`
            });
        }
    } catch (e) {
        logger.info("Could not delete order with id=");
        logger.info(e.message);
        res.status(500).send({
            message: "Could not delete order with id=" + id
        });
    }
};