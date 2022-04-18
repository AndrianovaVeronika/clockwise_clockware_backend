const logger = require("../utils/logger");
const db = require('../models');
const Order = db.order;

ifOrderExist = async (req, res, next) => {
    logger.info('Verifying if order exist');

    const timeInNum = parseInt(req.body.time.substring(0, 2));
    //check if order exist
    for (let i = -4, k = 3; i <= req.body.clockTypeId; i++, k--) {
        const orders = await Order.findAll({
            where: {
                date: req.body.date,
                time: (timeInNum + i) + ':00:00',
                clockTypeId: i < 0 ? k : null,
                cityId: req.body.cityId,
                masterId: req.body.masterId
            }
        });
        if (orders.length > 0) {
            logger.info('FUCK U ' + orders);
            res.status(400).send({MESSAGE: 'order exist'});
            return;
        }
    }

    next();
}

module.exports = {ifOrderExist};