'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.City);
      Order.belongsTo(models.ClockType);
      Order.belongsTo(models.Master);
      Order.belongsTo(models.User);
    }
  }
  Order.init({
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};