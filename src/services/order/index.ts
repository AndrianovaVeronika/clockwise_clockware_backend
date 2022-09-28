import db from "../../models";
import {Op} from 'sequelize';
import OrderFilters from "./order.filters";
import {OrderInput, OrderOutput, RawOrder} from "../../models/order/order.interface";

const {Order, User, City, ClockType, Master} = db.models;

const orderMapper = (order: RawOrder, withId?: boolean): OrderOutput => ({
        id: order.id,
        name: order.User.name,
        email: order.User.email,
        clockType: order.ClockType.name,
        master: order.Master.name,
        city: order.City.name,
        date: order.date,
        time: order.time,
        price: order.price,
        isCompleted: order.isCompleted,
        rating: order.rating,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        // deletedAt: order.deletedAt,
        ...(withId && {
            userId: order.userId,
            masterId: order.masterId,
            cityId: order.cityId,
            clockTypeId: order.clockTypeId,
        })
    })
;

export const findAll = async (filters?: OrderFilters, where?: Partial<OrderInput>): Promise<OrderOutput[]> => {
    const rawOrders = await Order.findAll({
        // where: {
        //     ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
        //     ...where
        // },
        // ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true}),
        include: [User, City, ClockType, Master],
    });
    return rawOrders.map(order => orderMapper(order));
};

export const findByPk = async (id: number): Promise<OrderOutput> => {
    const order = await Order.findByPk(id, {
        include: [User, City, ClockType, Master]
    });
    if (!order) {
        throw new Error(`Cannot find order with id=${id}.`);
    }
    return orderMapper(order);
};

export const findOneWhere = async (where: Partial<OrderInput>): Promise<OrderOutput> => {
    const order = await Order.findOne({
        where,
        include: [User, City, ClockType, Master]
    });
    if (!order) {
        throw new Error(`Cannot find order.`);
    }
    return orderMapper(order);
};

export const create = async (payload: OrderInput): Promise<OrderOutput> => {
    const createdOrder = await Order.create(payload, {
        include: [User, City, ClockType, Master]
    });
    return orderMapper(createdOrder);
};

export const updateByPk = async (id: number, payload: Partial<OrderInput>): Promise<OrderOutput> => {
    const order = await Order.findByPk(id, {
        include: [User, City, ClockType, Master]
    });
    if (!order) {
        throw new Error(`Cannot find order with id=${id}.`);
    }
    const updatedOrder = await order.update(payload);
    return orderMapper(updatedOrder);
};

export const updateWhere = async (where: Partial<OrderInput>, payload: Partial<OrderInput>): Promise<OrderOutput> => {
    const order = await Order.findOne({
        include: [User, City, ClockType, Master],
        where
    });
    if (!order) {
        throw new Error(`Cannot find order.`);
    }
    const updatedOrder = await order.update(payload);
    return orderMapper(updatedOrder);
};

export const deleteByPk = async (id: number): Promise<boolean> => {
    const deletedCityCount = await Order.destroy({
        where: {id}
    });
    return !!deletedCityCount;
};

export const countWhere = async (where: Partial<OrderInput>): Promise<number> => {
    return await Order.count({where});
};