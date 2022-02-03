const {getOrders, getOrderById, getOrdersByDateAndMaster, createOrder, deleteOrder} = require("./orderApi");
const {getCities, getCityById, createCity, deleteCity} = require("./cityApi");
const {getMasters, getMasterById, createMaster, deleteMaster} = require("./masterApi");

module.exports = {
    getOrders,
    getOrderById,
    getOrdersByDateAndMaster,
    createOrder,
    deleteOrder,
    getCities,
    getCityById,
    createCity,
    deleteCity,
    getMasters,
    getMasterById,
    createMaster,
    deleteMaster
}