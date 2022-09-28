'use strict';
import {Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import sequelize from "../../connections/db.connection";
import User from "../user";
import {ICode} from "./code.interface";

class Code extends Model<InferAttributes<Code>, InferCreationAttributes<Code>>
    implements ICode {
    declare id: CreationOptional<number>;
    public verificationCode!: string;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
    // declare readonly deletedAt!: CreationOptional<Date>;

    declare static associations: {
        roles: Association<Code, User>
    }
}

Code.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'Code',
});

export default Code;