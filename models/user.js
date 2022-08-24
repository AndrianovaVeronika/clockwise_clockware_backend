'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Order, {foreignKey: 'userId'});
            User.belongsToMany(models.Role, {through: 'UserRoles'});
            User.hasOne(models.Master, {foreignKey: 'userId'});
            User.hasOne(models.Code, {foreignKey: 'userId'});
        }
    }

    User.init({
            name: {
                type: DataTypes.STRING,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            password: DataTypes.STRING,
            emailChecked: {
                type: DataTypes.BOOLEAN,
                default: false
            }
        },
        {
            sequelize,
            modelName: 'User',
        });
    return User;
};