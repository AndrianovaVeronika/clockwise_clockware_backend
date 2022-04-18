'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClockType extends Model {
        static associate(models) {
            ClockType.hasMany(models.Order)
        }
    }

    ClockType.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ClockType',
    });
    return ClockType;
};