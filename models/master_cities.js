'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MasterCities extends Model {
        static associate(models) {}
    }

    MasterCities.init({}, {
        sequelize,
        modelName: 'MasterCities',
    });
    return MasterCities;
};