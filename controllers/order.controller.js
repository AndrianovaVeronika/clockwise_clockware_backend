const db = require('../models');
const logger = require("../utils/logger");
const {sendMail, sendOrderConfirmationMail} = require("../services/mail.service");
const Order = db.Order;
const User = db.User;
const City = db.City;
const ClockType = db.ClockType;
const Master = db.Master;

const getOrderNecessaryData = order => ({
    id: order.id,
    name: order.User.name,
    email: order.User.email,
    clockType: order.ClockType.name,
    master: order.Master.name,
    city: order.City.name,
    date: order.date,
    time: order.time,
    price: order.price,
    isCompleted: order.isCompleted
});

exports.create = async (req, res) => {
// Validate request
    logger.info('Creating order...');
    const newOrder = {
        date: req.body.date,
        time: req.body.time,
        userId: req.body.userId,
        cityId: req.body.cityId,
        clockTypeId: req.body.clockTypeId,
        masterId: req.body.masterId,
        price: req.body.price
    };
    try {
        const order = await Order.create(newOrder);
        logger.info('Order have been created');
        const createdOrder = await Order.findByPk(order.id, {
            include: [User, City, ClockType, Master]
        });
        //sending mail
        const orderData = getOrderNecessaryData(createdOrder);
        await sendOrderConfirmationMail(orderData);
        logger.info('Mail have been sent');
        return res.status(201).send(orderData);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
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
        return res.status(200).send(orders.map(getOrderNecessaryData));
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Find a single order with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    logger.info(`Finding order with id=${id}...`);
    try {
        const order = await Order.findByPk(id, {
            include: [User, ClockType, City, Master]
        });
        if (!order) {
            logger.error(`Cannot find order with id=${id}`);
            return res.status(400).send({
                message: `Cannot find order with id=${id}.`
            });
        }
        logger.info('Order have been found!');
        return res.status(200).send(getOrderNecessaryData(order));
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
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
        return res.status(200).send(getOrderNecessaryData(order));
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
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
        return res.status(200).send({id: id});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

exports.findAllCurrentUserOrders = async (req, res) => {
    const id = req.userId;
    logger.info(`Retrieving all orders for user with id=${id}...`);
    try {
        const orders = await Order.findAll({
            where: {userId: id},
            include: [User, ClockType, City, Master],
        });
        logger.info('Orders retrieved!');
        return res.status(200).send(orders.map(getOrderNecessaryData));
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}

exports.findAllCurrentMasterOrders = async (req, res) => {
    const id = req.masterId;
    logger.info(`Retrieving all orders for master with id=${id}...`);
    try {
        const orders = await Order.findAll({where:{masterId: id}, include: [User, ClockType, City, Master]})
        logger.info('Orders retrieved!');
        return res.status(200).send(orders.map(getOrderNecessaryData));
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}