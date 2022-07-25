const logger = require("../utils/logger");
const {Order} = require("../models");

const getOrderDependingOnModelId = async (model, id) => {
    return await Order.findOne({
        where: {[model + 'Id']: id}
    });
};

const getModelValidator = (model) => {
    return async (req, res, next) => {
        const id = req.params.id;
        logger.info('Checking if ' + model + ' with id=' + id + ' can be deleted...');
        if (await getOrderDependingOnModelId(model, id)) {
            logger.error(model[0].toUpperCase() + model.slice(1) + " is assigned to order. Delete can`t be complete");
            return res.status(400).send({
                message: model[0].toUpperCase() + model.slice(1) + " is assigned to order. Delete can`t be complete"
            });
        }
        next();
    };
};

const ifObjectAssignedToOrder = {
    city: getModelValidator('city'),
    master: getModelValidator('master'),
    user: getModelValidator('user')
};

module.exports = ifObjectAssignedToOrder;