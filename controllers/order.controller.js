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
    const newOrder = {
        date: req.body.date,
        time: req.body.time,
        userId: req.body.userId,
        cityId: req.body.cityId,
        clockTypeId: req.body.clockTypeId,
        masterId: req.body.masterId
    };
    try {
        const order = await Order.create(newOrder);
        logger.info('Order have been created');
        const user = await User.findByPk(newOrder.userId);
        const city = await City.findByPk(newOrder.cityId);
        const clockType = await ClockType.findByPk(newOrder.clockTypeId);
        const master = await Master.findByPk(newOrder.masterId);
        logger.info('Building up mail...')
        const mailData = {
            username: user.username,
            email: user.email,
            clockType: clockType.name,
            master: master.name,
            city: city.name,
            date: newOrder.date,
            time: newOrder.time
        };
        let mail = '';
        for (const key in mailData) {
            // logger.info(key + ': ' + mailData[key]);
            mail += '\n' + key + ': ' + mailData[key];
        }
        await sendMail({
            to: mailData.email,
            subject: 'Order `ve been registered successfully',
            text: 'Your order:\n' + mail,
        })
        logger.info('Mail have been sent');
        res.status(201).send({
            id: order?.id,
            date: order?.date,
            time: order?.time,
            ...mailData
        });
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
};

// Retrieve all from the database.
exports.findAll = async (req, res) => {
    logger.info('Retrieving all orders...');
    try {
        const orders = await Order.findAll({
            include: [User, ClockType, City, Master]
        });
        logger.info('Orders retrieved!');
        res.status(200).send(orders.map(order => {
            return {
                id: order?.id,
                date: order?.date,
                time: order?.time,
                username: order?.User?.username,
                email: order?.User?.email,
                clockType: order?.ClockType?.name,
                city: order?.City?.name,
                master: order?.Master?.name
            }
        }));
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
};

// Find a single order with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    logger.info(`Finding order with id=${id}...`);
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            logger.error(`Cannot find order with id=${id}`);
            res.status(404).send({
                message: `Cannot find order with id=${id}.`
            });
        }
        logger.info('Order have been found!');
        res.status(200).send(order);
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    logger.info(`Updating order with id=${id}...`);
    try {
        await Order.update(req.body, {
            where: {id: id}
        });
        const order = await Order.findByPk(id, {
            include: [User, ClockType, City, Master]
        });
        logger.info("Order has been updated successfully!");
        res.status(200).send({
            id: order.id,
            date: order.date,
            time: order.time,
            username: order.User.username,
            email: order.User.email,
            clockType: order.ClockType.name,
            city: order.City.name,
            master: order.Master.name
        });
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
};

// Delete an order with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    logger.info(`Deleting order with id=${id}...`);
    try {
        await Order.destroy({
            where: {id: id}
        });
        logger.info("Order was deleted successfully!");
        res.status(200).send({id: id});
    } catch (e) {
        logger.error(e.message);
        res.status(500).send({message: e.message});
    }
};