'use strict';
const {
    Model
} = require('sequelize');
const logger = require("../utils/logger");
module.exports = (sequelize, DataTypes) => {
    class City extends Model {
        static associate(models) {
            City.hasMany(models.Order, {foreignKey: 'cityId'});
            City.belongsToMany(models.Master, {through: 'MasterCities'});
        }
    }

    City.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'City',
    });
    return City;
};