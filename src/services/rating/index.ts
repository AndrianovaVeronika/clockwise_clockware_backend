import db from "../../models";
import sequelize from "../../connections/db.connection";

const {Order, Master} = db.models;

export const countMasterNewRating = async (orderRating: number, masterId: number): Promise<any> => {
    const data = await Order.findAll({
        where: {masterId, isCompleted: true},
        attributes: [
            [sequelize.fn("AVG", sequelize.col('rating')), 'average']
        ],
    });
    return data[0];
};

// unbelievably outstanding mathematics method, that no one appreciated
// export const countMasterNewRating = async (orderRating: number, masterId: number): Promise<number> => {
//     const numberOfMasterOrders = await orderService.countWhere({masterId, isCompleted: true});
//     const master = await Master.findByPk(masterId);
//     // (curr_master_rating * num_of_MasterOrders + order_rating) / (number_completed_orders + 1)
//     return (master.rating * numberOfMasterOrders + orderRating) / (numberOfMasterOrders + 1);
// };