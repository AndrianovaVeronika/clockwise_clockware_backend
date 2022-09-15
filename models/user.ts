'use strict';
import {DataTypes, Model} from "sequelize";
import sequelize from "../connections/db.connection";

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public emailChecked!: boolean;
    public isPasswordTemporary!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    static associate(models) {
        User.hasMany(models.Order, {foreignKey: 'userId'});
        User.belongsToMany(models.Role, {through: 'UserRoles'});
        User.hasOne(models.Master, {foreignKey: 'userId'});
        User.hasOne(models.Code, {foreignKey: 'userId'});
    }
}

User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        emailChecked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isPasswordTemporary: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: 'User',
        paranoid: true, //soft delete
        timestamps: true
    }
);

export default User;