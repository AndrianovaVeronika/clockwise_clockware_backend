const logger = require("../utils/logger");
const db = require('../models');
const {User} = require("../models");
const {parseTimeStringToInt, parseIntToTimeString} = require("../services/parse_time.service");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const Order = db.Order;

ifDateTimeAppropriate = async (req, res, next) => {
    logger.info('Verifying if date and time are correct...');
    const minAllowedDate = new Date();
    const incomeDate = new Date(req.body.date);
    if (incomeDate <= minAllowedDate) {
        logger.error('The date exceeds min date.');
        return res.status(400).send({message: 'The date exceeds min date.'});
    }
    const minTime = 10;
    const maxTime = 18;
    const time = parseTimeStringToInt(req.body.time);
    if ((time < minTime) || (time > maxTime)) {
        logger.error('The time exceeds work hours.');
        return res.status(400).send({message: 'The time exceeds work hours.'});
    }
    logger.info('Date and time are correct. Heading next...');
    next();
}

ifUserCreated = async (req, res, next) => {
    logger.info('Verifying if such user already exist...');
    const userToFind = {
        name: req.body.name,
        email: req.body.email
    }
    try {
        const [user, isUserCreated] = await User.findOrCreate({
            where: userToFind,
            defaults: userToFind
        });
        if (isUserCreated) {
            await user.setRoles([1]);
            logger.info('User has been created as new. Heading next...');
        } else {
            const token = req.headers["x-access-token"];
            logger.info(token)
            if (token === null) {
                logger.info('User is not authorized');
                if (user.emailChecked) {
                    logger.error('Log in before placing new order!');
                    return res.status(400).send({message: 'Log in before placing new order!'});
                } else {
                    logger.error('Your email is unchecked. Please check your email for confirmation letter');
                    return res.status(400).send({message: 'Your email is unchecked. Please check your email for confirmation letter'});
                }
            } else {
                jwt.verify(token, config.secret, async (err, decoded) => {
                    if (err) {
                        logger.error("Authorization error!");
                        return res.status(401).send({message: "Authorization error!"});
                    }
                    if (decoded.id !== user.id) {
                        res.status(400).send({message: "User authorized but name and email belong to another user"});
                    }
                });
            }
        }
        req.body.userId = user.id;
        next();
    } catch (e) {
        logger.error(e.message + ': Check user credentials.');
        return res.status(400).send({message: e.message + ': Check user credentials.'});
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
                return res.status(400).send({message: 'Order interrogates with other orders. Try to change date or time and pick master one more time.'});
            }
        }
        logger.info('Order credentials have been verified. Heading next...')
        next();
    } catch (e) {
        logger.error(e.message + ': Check order credentials.');
        return res.status(500).send({message: e.message + ': Check order credentials.'});
    }
}

module.exports = [ifDateTimeAppropriate, ifUserCreated, ifOrderCanBePlaced];