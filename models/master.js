'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Master extends Model {
        static associate(models) {
            Master.hasMany(models.Order, {foreignKey: 'masterId'});
            Master.belongsToMany(models.City, {through: 'MasterCities'});
            Master.belongsTo(models.User, {foreignKey: 'userId'});
        }
    }

    Master.init({
        name: DataTypes.STRING,
        rating: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Master',
    });
    return Master;
};