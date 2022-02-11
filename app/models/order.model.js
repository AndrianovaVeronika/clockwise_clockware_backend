module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        date: {
            type: Sequelize.DATEONLY
        },
        time: {
            type: Sequelize.TIME
        },
    });
    return Order;
};