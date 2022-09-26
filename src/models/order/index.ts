'use strict';
import {DataTypes, Model} from "sequelize";
import {IOrder, OrderInput} from "./order.interface";
import sequelize from "../../connections/db.connection";

class Order extends Model<IOrder, OrderInput> implements IOrder {
    public id!: number;
    public date!: string;
    public time!: string;
    public price!: number;
    public isCompleted!: boolean;
    public rating!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;

    static associate(models: any) {
        Order.belongsTo(models.City, {foreignKey: 'cityId'});
        Order.belongsTo(models.ClockType, {foreignKey: 'clockTypeId'});
        Order.belongsTo(models.Master, {foreignKey: 'masterId'});
        Order.belongsTo(models.User, {foreignKey: 'userId'});
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
}, {
    sequelize,
    modelName: 'Order',
    paranoid: true, // soft delete
    timestamps: true
});

export default Order;