const logger = require("../utils/logger");
const {Order} = require("../models");

ifOrderBelongToMaster = async (req, res, next) => {
    try {
        logger.info("Checking if order belong to master...");
        const order = await Order.findByPk(req.params.id);
        logger.info(order.masterId)
        logger.info(req.masterId)
        if (order.masterId !== req.masterId) {
            logger.error('Master has no access to change this order!');
            return res.status(400).send({message: 'You have no access to change this order!'});
        }
        logger.info("Checked! Heading next...");
        next();
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

module.exports = ifOrderBelongToMaster;