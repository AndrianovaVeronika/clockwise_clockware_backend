import {countPrice} from "../../services/price";
import logger from "../../utils/logger";
import * as orderService from "../../services/order";
import * as masterService from "../../services/master";
import * as ratingService from "../../services/rating";
import {sendOrderConfirmationMail} from "../../services/mail";
import {Request, Response} from "express";

export const create = async (req: Request, res: Response) => {
// Validate request
    logger.info('Creating order...');
    try {
        const countedPrice = await countPrice(req.body.cityId, req.body.clockTypeId);
        const newOrder = {
            name: req.body.name,
            email: req.body.email,
            date: req.body.date,
            time: req.body.time,
            cityId: req.body.cityId,
            clockTypeId: req.body.clockTypeId,
            masterId: req.body.masterId,
            price: countedPrice
        };
        const createdOrder = await orderService.create(newOrder);
        logger.info('Order have been created');
        // sending mail
        await sendOrderConfirmationMail(createdOrder);
        logger.info('Mail have been sent');
        return res.status(201).send(createdOrder);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Retrieve all from the database.
export const findAll = async (req: Request, res: Response) => {
    logger.info('Retrieving all orders...');
    try {
        const orders = await orderService.findAll();
        logger.info('Orders retrieved!');
        return res.status(200).send(orders);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Find a single order with an id
export const findOne = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info(`Finding order with id=${id}...`);
    try {
        const order = await orderService.findByPk(id);
        if (!order) {
            logger.error(`Cannot find order with id=${id}`);
            return res.status(400).send({
                message: `Cannot find order with id=${id}.`
            });
        }
        logger.info('Order has been found!');
        return res.status(200).send(order);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Update a Tutorial by the id in the request
export const update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info(`Updating order with id=${id}...`);
    try {
        const updatedOrder = await orderService.updateByPk(id, req.body);
        logger.info("Order has been updated successfully!");
        return res.status(200).send(updatedOrder);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Delete an order with the specified id in the request
export const deleteByPk = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info(`Deleting order with id=${id}...`);
    try {
        const isDeleted = await orderService.deleteByPk(id);
        if (!isDeleted) {
            return res.status(409).send({message: 'Order can`t be deleted'});
        }
        logger.info("Order was deleted successfully!");
        return res.status(200).send({id});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

export const findAllCurrentUserOrders = async (req: Request, res: Response) => {
    const id = req.userId;
    logger.info(`Retrieving all orders for user with id=${id}...`);
    try {
        const orders = await orderService.findAll({}, {userId: id});
        logger.info('Orders retrieved!');
        return res.status(200).send(orders);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}

export const findAllCurrentMasterOrders = async (req: Request, res: Response) => {
    const id = req.masterId;
    logger.info(`Retrieving all orders for master with id=${id}...`);
    try {
        const orders = await orderService.findAll({}, {masterId: id});
        logger.info('Orders retrieved!');
        return res.status(200).send(orders);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}

export const rateOrder = async (req: Request, res: Response) => {
    logger.info('Rating order...');
    try {
        const id = parseInt(req.params.id, 10);
        const targetOrder = await orderService.findByPk(id, {returnWithIds: true});
        if (req.userId !== targetOrder.userId) {
            logger.error('User has no access to update order');
            return res.status(400).send({message: 'Authorized user has no access to update order'});
        }
        const newRating = (await ratingService.countMasterNewRating(req.body.rating, targetOrder.masterId)).average;
        await masterService.updateWhere({id: targetOrder.masterId}, {rating: newRating});
        await orderService.updateWhere({id: targetOrder.id}, {rating: req.body.rating});
        logger.info('Order is rated. Master rating is updated.');
        return res.status(200).send({...targetOrder, rating: req.body.rating});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};