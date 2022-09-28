'use strict';
import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import {IRole} from "./role.interface";
import sequelize from "../../connections/db.connection";

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>>
    implements IRole {
    declare id: CreationOptional<number>;
    declare name: string;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
    // declare readonly deletedAt!: CreationOptional<Date>;

    declare static associations: {

    }
}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'Role',
});

export default Role;