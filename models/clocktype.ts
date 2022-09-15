'use strict';
import {DataTypes, Model} from 'sequelize';
import {ClockTypeInput, IClockType} from "./interfaces/clocktype.interface";
import sequelize from "../connections/db.connection";

class ClockType extends Model<IClockType, ClockTypeInput> implements IClockType {
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    static associate(models) {
        ClockType.hasMany(models.Order, {foreignKey: 'clockTypeId'})
    }
}

ClockType.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'ClockType',
    paranoid: true, //soft delete
    timestamps: true
});

export default ClockType;