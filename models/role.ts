'use strict';
import {DataTypes, Model} from "sequelize";
import {IRole, RoleInput} from "./interfaces/role.interface";
import sequelize from "../connections/db.connection";

class Role extends Model<IRole, RoleInput> implements IRole {
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models) {
        Role.belongsToMany(models.User, {through: 'UserRoles'});
    }
}

Role.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'Role',
    timestamps: true
});

export default Role;