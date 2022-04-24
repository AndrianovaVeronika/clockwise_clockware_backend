const logger = require("../utils/logger");
const db = require('../models');
const Order = db.Order;

ifOrderExist = async (req, res, next) => {
    logger.info('Verifying if order exist');

    for (const bodyKey in req.body) {
        logger.info(bodyKey + ": " + req.body[bodyKey])
    }
    const timeInNum = parseInt(req.body.time.substring(0, 2));
    //check if order exist
    for (let i = -4; i <= req.body.clockTypeId; i++) {
        const orders = await Order.findAll({
            where: {
                date: req.body.date,
                time: (timeInNum + i) + ':00:00',
                cityId: req.body.cityId,
                masterId: req.body.masterId
            }
        });
        if (orders.length > 0) {
            res.status(400).send({MESSAGE: 'order exist'});
            return;
        }
    }

    next();
}

module.exports = {ifOrderExist};