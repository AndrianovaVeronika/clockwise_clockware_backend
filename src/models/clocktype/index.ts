'use strict';
import {Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import sequelize from "../../connections/db.connection";
import {IMaster} from "../master/master.interface";
import Order from "../order";

class ClockType extends Model<InferAttributes<ClockType>, InferCreationAttributes<ClockType>>
    implements IMaster {
    declare id: CreationOptional<number>;
    declare name: string;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
    // declare readonly deletedAt!: CreationOptional<Date>;

    declare static associations: {
        roles: Association<ClockType, Order>
    }
}

ClockType.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'ClockTypes',
    // paranoid: true, // soft delete
});

export default ClockType;