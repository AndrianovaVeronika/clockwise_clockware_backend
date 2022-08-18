'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Code extends Model {
        static associate(models) {
            Code.belongsTo(models.User, {foreignKey: 'userId'});
        }
    }

    Code.init({
        verificationCode: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Code',
    });
    return Code;
};