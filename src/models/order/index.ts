'use strict';
import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import {IOrder} from "./order.interface";
import sequelize from "../../connections/db.connection";

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>>
    implements IOrder {
    declare id: CreationOptional<number>;
    declare date: string;
    declare time: string;
    declare price: number;
    declare isCompleted: boolean;
    declare rating: number;

    declare readonly createdAt: CreationOptional<Date>;
    declare readonly updatedAt: CreationOptional<Date>;
    // declare readonly deletedAt!: CreationOptional<Date>;

    declare static associations: {

    }
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'Order',
    // paranoid: true, // soft delete
});

export default Order;