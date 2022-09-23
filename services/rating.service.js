const db = require("../models");
const {Order, Master} = db;

exports.countMasterNewRating = async (orderRating, masterId) => {
    const numberOfMasterOrders = await Order.count({where: {masterId, isCompleted: true}});
    const master = await Master.findByPk(masterId);
    // (curr_master_rating * num_of_MasterOrders + order_rating) / (number_completed_orders + 1)
    return Math.round((master.rating * numberOfMasterOrders + orderRating) / (numberOfMasterOrders + 1));
};