const logger = require("../utils/logger");
const db = require('../models');
const {User} = require("../models");
const {parseTimeStringToInt, parseIntToTimeString} = require("../services/time.service");
const Order = db.Order;

ifDateTimeAppropriate = async (req, res, next) => {
    logger.info('Verifying if date and time are correct...');
    const minAllowedDate = new Date();
    const incomeDate = new Date(req.body.date);
    if (incomeDate <= minAllowedDate) {
        logger.error('The date exceeds min date.');
        res.status(400).send({message: 'The date exceeds min date.'});
        return;
    }
    const minTime = 10;
    const maxTime = 18;
    const time = parseTimeStringToInt(req.body.time);
    if ((time < minTime) || (time > maxTime)) {
        logger.error('The time exceeds work hours.');
        res.status(400).send({message: 'The time exceeds work hours.'});
        return;
    }
    logger.info('Date and time are correct. Heading next...');
    next();
}

ifUserCreated = async (req, res, next) => {
    logger.info('Verifying if such user already exist...');
    const userToFind = {
        username: req.body.username,
        email: req.body.email
    }
    try {
        const userObj = await User.findOrCreate({
            where: userToFind,
            defaults: userToFind
        });
        const [user, isUserCreated] = userObj;
        if (isUserCreated) {
            await user.setRoles([1]);
            logger.info('User has been created as new. Heading next...');
        } else {
            logger.info('User has been found. Heading next...');
        }
        req.body.userId = user.id;
        next();
    } catch (e) {
        logger.error(e.message + ': Check user credentials.');
        res.status(400).send({message: e.message + ': Check user credentials.'});
    }
}

ifOrderCanBePlaced = async (req, res, next) => {
    logger.info('Verifying order credentials...');
    const timeInNum = parseInt(req.body.time.substring(0, 2));
    //check if order exist
    try {
        for (let i = -3, ct = 3; i <= req.body.clockTypeId; i++, ct--) {
            const objToCompare = {
                date: req.body.date,
                time: parseIntToTimeString(timeInNum + i),
                cityId: req.body.cityId,
                masterId: req.body.masterId
            };
            if (i < 0) {
                objToCompare.clockTypeId = ct;
            }
            const orders = await Order.findAll({
                where: objToCompare
            });
            if (orders.length > 0) {
                logger.error('Order interrogates with other orders. Try to change date or time and pick master one more time.');
                res.status(400).send({message: 'Order interrogates with other orders. Try to change date or time and pick master one more time.'});
                return;
            }
        }
        logger.info('Order credentials have been verified. Heading next...')
        next();
    } catch (e) {
        logger.error(e.message + ': Check order credentials.');
        res.status(500).send({message: e.message + ': Check order credentials.'});
    }
}

module.exports = [ifDateTimeAppropriate, ifUserCreated, ifOrderCanBePlaced];