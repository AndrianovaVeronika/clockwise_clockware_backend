const logger = require("../utils/logger");
const db = require('../models');
const {User} = require("../models");
const {parseTimeStringToInt, parseIntToTimeString} = require("../services/time.service");
const Order = db.Order;

ifDateTimeAppropriate = async (req, res, next) => {
    logger.info('Verifying if date and time are correct...');
    // if (!req.body) {
    //     res.status(400).send({message: 'Order add err: body undefined'});
    //     return;
    // }
    //check date
    const minAllowedDate = new Date();
    const incomeDate = new Date(req.body.date);
    if (incomeDate <= minAllowedDate) {
        logger.info('Error: The date exceeds min date');
        res.status(500).send({message: 'Error: The date exceeds min date'});
        return;
    }
    const minTime = 10;
    const maxTime = 18;
    const time = parseTimeStringToInt(req.body.time);
    if ((time < minTime) || (time > maxTime)) {
        logger.info('Error: The time exceeds work hours');
        res.status(500).send({message: 'Error: The time exceeds work hours'});
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
        logger.info('IfOrderExistError:');
        logger.info(e);
        res.status(500).send({message: e.message});
    }
}

ifOrderExist = async (req, res, next) => {
    logger.info('Verifying if order exist');
    for (const bodyKey in req.body) {
        logger.info(bodyKey + ": " + req.body[bodyKey])
    }
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
            logger.info('date: ' + req.body.date + '; '
                + 'time: ' + (timeInNum + i) + ':00:00' + '; '
                + 'cityId: ' + req.body.cityId + '; '
                + 'masterId: ' + req.body.masterId);
            if (orders.length > 0) {
                logger.info('Error: Order can`t be placed.');
                res.status(400).send({message: 'Error: Order can`t be placed.'});
                return;
            }
        }
        next();
    } catch (e) {
        logger.info('IfOrderExistError:');
        logger.info(e);
        res.status(500).send({message: e.message});
    }
}

module.exports = [ifDateTimeAppropriate, ifUserCreated, ifOrderExist];