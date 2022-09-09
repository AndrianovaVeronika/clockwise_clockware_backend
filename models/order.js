'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.City, {foreignKey: 'cityId'});
            Order.belongsTo(models.ClockType, {foreignKey: 'clockTypeId'});
            Order.belongsTo(models.Master, {foreignKey: 'masterId'});
            Order.belongsTo(models.User, {foreignKey: 'userId'});
        }
    }

    Order.init({
        date: DataTypes.DATEONLY,
        time: DataTypes.TIME,
        price: DataTypes.DOUBLE,
        isCompleted: DataTypes.BOOLEAN,
        rating: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};