'use strict';
import {
    Association,
    CreationOptional,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManySetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from "sequelize";
import sequelize from "../../connections/db.connection";
import {IUser} from "./user.interface";
import Role from "../role";

class User extends Model<InferAttributes<User, { omit: 'roles' }>, InferCreationAttributes<User, { omit: 'roles' }>>
    implements IUser {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare emailChecked: CreationOptional<boolean>;
    declare isPasswordTemporary: CreationOptional<boolean>;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
    // declare readonly deletedAt!: CreationOptional<Date>;

    declare setRoles: HasManySetAssociationsMixin<Role, string>;
    declare getRoles: HasManyGetAssociationsMixin<Role>;

    declare roles?: NonAttribute<string[]>

    declare static associations: {
        roles: Association<User, Role>
    }
}

User.init({
        id: {
            type: DataTypes.INTEGER,
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
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        modelName: 'User',
        // paranoid: true, // soft delete
    }
);

export default User;