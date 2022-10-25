import db from "../../models";
import OrderFilters from "./order.filters";
import {OrderInput, OrderOutput, RawOrder} from "../../models/order/order.interface";

const {Order, User, City, ClockType, Master} = db.models;
const Op = db.Sequelize.Op;

const orderMapper = (order: RawOrder, withId?: boolean): OrderOutput => order ? ({
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
}) : undefined;

export const findAll = async (filters?: OrderFilters): Promise<{ total: number; data: OrderOutput[] }> => {
    const data = await Order.findAndCountAll({
        where: {
            // ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
            ...filters?.where,
            ...(filters?.priceRange && {
                price: {
                    [Op.between]: filters.priceRange
                }
            }),
            ...(filters?.dateRange && {
                date: {
                    [Op.between]: filters.dateRange
                }
            }),
        },
        // ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true}),
        include: [User, City, ClockType, Master],
        ...(filters?.page && {offset: filters.page * filters.limit}),
        ...(filters?.limit && {limit: filters.limit}),
    });
    return {total: data.count, data: data.rows.map(order => orderMapper(order, filters?.returnWithIds))};
};

export const findByPk = async (id: number, filters?: OrderFilters): Promise<OrderOutput> => {
    const order = await Order.findByPk(id, {
        include: [User, City, ClockType, Master]
    });
    return orderMapper(order, filters?.returnWithIds);
};

export const findOneWhere = async (where: Partial<OrderInput>, filters?: OrderFilters): Promise<OrderOutput> => {
    const order = await Order.findOne({
        where,
        include: [User, City, ClockType, Master]
    });
    return orderMapper(order, filters?.returnWithIds);
};

export const create = async (payload: OrderInput): Promise<OrderOutput> => {
    const user = await User.findOne({where: {name: payload.name, email: payload.email}});
    if (!user) {
        throw new Error('User has not been found');
    }
    const order = await Order.create({...payload, userId: user.id});
    const createdOrder = await Order.findByPk(order.id, {
        include: [User, City, ClockType, Master]
    });
    return orderMapper(createdOrder);
};

export const updateByPk = async (id: number, payload: Partial<OrderInput>): Promise<OrderOutput> => {
    const order = await Order.findByPk(id, {
        include: [User, City, ClockType, Master]
    });
    const updatedOrder = await order.update(payload);
    return orderMapper(updatedOrder);
};

export const updateWhere = async (where: Partial<OrderInput>, payload: Partial<OrderInput>): Promise<OrderOutput> => {
    const order = await Order.findOne({
        include: [User, City, ClockType, Master],
        where
    });
    const updatedOrder = await order.update(payload);
    return orderMapper(updatedOrder);
};

export const deleteByPk = async (id: number): Promise<boolean> => {
    const deletedCityCount = await Order.destroy({
        where: {id}
    });
    return !!deletedCityCount;
};