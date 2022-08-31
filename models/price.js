'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Price extends Model {
        static associate(models) {
            Price.belongsTo(models.City, {foreignKey: 'cityId'});
        }
    }

    Price.init({
        sum: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        cityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Price',
    });
    return Price;
};