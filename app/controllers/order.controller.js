const db = require('../models');
const logger = require("../../utils/logger");
const Order = db.order;

exports.create = (req, res) => {
// Validate request
    logger.info('Creating order...');
    if (!req.body) {
        res.status(400).send({message: 'Order add failure: body undefined'});
        return;
    }

    const order = {
        date: req.body.date,
        time: req.body.time,
        user_id: req.body.user_id,
        city_id: req.body.city_id,
        clock_type_id: req.body.clock_type_id,
        master_id: req.body.master_id,
    };
    logger.info('New order: ');
    for (const orderKey in order) {
        logger.info(orderKey + ': ' + order[orderKey]);
    }

    // Save in the database
    Order.create(order)
        .then(data => {
            logger.info('Order added');
            res.status(201).send(data);
        })
        .catch(err => {
            logger.info('Order add failure');
            res.status(500).send({
                message: err.message || "Some error occurred while creating new order."
            });
        });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
    logger.info('Retrieving all orders...');
    Order.findAll()
        .then(data => {
            logger.info('Orders retrieved');
            res.send(data);
        })
        .catch(err => {
            logger.info('Order find all: failure');
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};

// Find a single order with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    logger.info(`Finding order with id=${id}...`);
    Order.findByPk(id)
        .then(data => {
            if (data) {
                logger.info('Order found');
                res.status(200).send(data);
            } else {
                logger.info(`Cannot find order with id=${id}`);
                res.status(404).send({
                    message: `Cannot find order with id=${id}.`
                });
            }
        })
        .catch(err => {
            logger.info("Error retrieving order with id=" + id);
            res.status(500).send({
                message: "Error retrieving order with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    logger.info(`Updating order with id=${id}...`);

    if (!req.body) {
        logger.info('Order update failure: body undefined');
        res.status(400).send({message: 'Order update failure: body undefined'});
        return;
    }

    Order.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                logger.info("Order was updated successfully");
                res.status(200).send({
                    message: "Order was updated successfully"
                });
            } else {
                logger.info(`Cannot update order with id=${id}!`);
                res.status(200).send({
                    message: `Cannot update order with id=${id}!`
                });
            }
        })
        .catch(err => {
            logger.info("Error updating order with id=" + id);
            logger.info(err.message);
            res.status(500).send({
                message: "Error updating order with id=" + id
            });
        });
};

// Delete an order with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    logger.info(`Deleting order with id=${id}...`);

    Order.destroy({
        where: { id: id }
    })
        .then(num => {
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
        })
        .catch(err => {
            logger.info("Could not delete order with id=");
            logger.info(err.message);
            res.status(500).send({
                message: "Could not delete order with id=" + id
            });
        });
};