'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class City extends Model {
        static associate(models) {
            City.hasMany(models.Order);
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