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
        }
    }

    User.init({
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        });
    return User;
};