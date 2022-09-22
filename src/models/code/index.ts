'use strict';
import {DataTypes, Model} from 'sequelize';
import {ICode, CodeInput} from "./code.interface";
import sequelize from "../../connections/db.connection";
import User from "../user";

class Code extends Model<ICode, CodeInput> implements ICode {
    public id!: number;
    public verificationCode!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Code.belongsTo(User, {foreignKey: 'userId'});

Code.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Code',
    timestamps: true
});

export default Code;