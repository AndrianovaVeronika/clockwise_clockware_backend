const {getOrders, getOrderById, createOrder, deleteOrder} = require("./orderApi");
const {getCities, createCity, deleteCity} = require("./cityApi");
const {getMasters, createMaster, deleteMaster} = require("./masterApi");

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    deleteOrder,
    getCities,
    createCity,
    deleteCity,
    getMasters,
    createMaster,
    deleteMaster
}