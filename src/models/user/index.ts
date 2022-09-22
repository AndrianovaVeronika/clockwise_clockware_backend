'use strict';
import {DataTypes, HasManyGetAssociationsMixin, HasManySetAssociationsMixin, Model} from "sequelize";
import sequelize from "../../connections/db.connection";
import {IUser, UserInput} from "./user.interface";
import Order from "../order";
import Master from "../master";
import Code from "../code";
import Role from "../role";

class User extends Model<IUser, UserInput> implements IUser {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public emailChecked!: boolean;
    public isPasswordTemporary!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
    declare setRoles: HasManySetAssociationsMixin<Role, string>;
    declare getRoles: HasManyGetAssociationsMixin<Role>;
}

User.hasMany(Order, {foreignKey: 'userId'});
User.belongsToMany(Role, {through: 'UserRoles'});
User.hasOne(Master, {foreignKey: 'userId'});
User.hasOne(Code, {foreignKey: 'userId'});

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
        paranoid: true, // soft delete
        timestamps: true
    }
);

export default User;