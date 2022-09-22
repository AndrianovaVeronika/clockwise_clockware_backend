import * as orderService from "../order";
import db from "../../models";

const {Order, Master} = db.models;

export const countMasterNewRating = async (orderRating: number, masterId: number): Promise<number> => {
    const numberOfMasterOrders = await orderService.countWhere({masterId, isCompleted: true});
    const master = await Master.findByPk(masterId);
    // (curr_master_rating * num_of_MasterOrders + order_rating) / (number_completed_orders + 1)
    return (master.rating * numberOfMasterOrders + orderRating) / (numberOfMasterOrders + 1);
};