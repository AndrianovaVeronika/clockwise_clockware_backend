module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        date: {
            type: Sequelize.DATEONLY
        },
        time: {
            type: Sequelize.TIME
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        city_id: {
            type: Sequelize.INTEGER
        },
        clock_type_id: {
            type: Sequelize.INTEGER
        },
        master_id: {
            type: Sequelize.INTEGER
        }
    });
    return Order;
};