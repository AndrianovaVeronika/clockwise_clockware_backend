const logger = require("../utils/logger");
const {Order} = require('../models');

const ifObjectAssignedToOrder = async (model, id) => {
    const ifExist = await Order.findOne({
        where: {[model + 'Id']: id}
    });
    return ifExist;
};

const getModelValidator = (model) => {
    return async (req, res, next) => {
        const id = req.params.id;
        logger.info('Checking if ' + model + ' with id=' + id + ' can be deleted...');
        if (await ifObjectAssignedToOrder(model, id)) {
            res.status(403).send({
                message: model[0].toUpperCase() + model.slice(1) + " is assigned to order. Delete can`t be complete"
            });
            return;
        }
        next();
    };
};

const ifOrderAssignedTo = {
    city: getModelValidator('city'),
    master: getModelValidator('master'),
    user: getModelValidator('user')
};

module.exports = ifOrderAssignedTo;