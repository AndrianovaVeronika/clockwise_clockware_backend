'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class City extends Model {
        static associate(models) {
            City.hasMany(models.Order, {foreignKey: 'cityId'});
            City.belongsToMany(models.Master, {through: 'MasterCities'});
        }
    }

    City.init({
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'City',
    });
    return City;
};