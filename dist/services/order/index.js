"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countWhere = exports.deleteByPk = exports.updateWhere = exports.updateByPk = exports.create = exports.findOneWhere = exports.findByPk = exports.findAll = void 0;
const models_1 = __importDefault(require("../../models"));
const sequelize_1 = require("sequelize");
const { Order, User, City, ClockType, Master } = models_1.default.models;
const orderMapper = (order, withId) => (Object.assign({ id: order.id, name: order.User.name, email: order.User.email, clockType: order.ClockType.name, master: order.Master.name, city: order.City.name, date: order.date, time: order.time, price: order.price, isCompleted: order.isCompleted, rating: order.rating, createdAt: order.createdAt, updatedAt: order.updatedAt }, (withId && {
    userId: order.userId,
    masterId: order.masterId,
    cityId: order.cityId,
    clockTypeId: order.clockTypeId,
})));
const findAll = (filters, where) => __awaiter(void 0, void 0, void 0, function* () {
    const rawOrders = yield Order.findAll(Object.assign(Object.assign({ where: Object.assign(Object.assign({}, ((filters === null || filters === void 0 ? void 0 : filters.isDeleted) && { deletedAt: { [sequelize_1.Op.not]: null } })), where) }, (((filters === null || filters === void 0 ? void 0 : filters.isDeleted) || (filters === null || filters === void 0 ? void 0 : filters.includeDeleted)) && { paranoid: true })), { include: [User, City, ClockType, Master] }));
    return rawOrders.map(order => orderMapper(order));
});
exports.findAll = findAll;
const findByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order.findByPk(id, {
        include: [User, City, ClockType, Master]
    });
    if (!order) {
        throw new Error(`Cannot find order with id=${id}.`);
    }
    return orderMapper(order);
});
exports.findByPk = findByPk;
const findOneWhere = (where) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order.findOne({
        where,
        include: [User, City, ClockType, Master]
    });
    if (!order) {
        throw new Error(`Cannot find order.`);
    }
    return orderMapper(order);
});
exports.findOneWhere = findOneWhere;
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdOrder = yield Order.create(payload, {
        include: [User, City, ClockType, Master]
    });
    return orderMapper(createdOrder);
});
exports.create = create;
const updateByPk = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order.findByPk(id, {
        include: [User, City, ClockType, Master]
    });
    if (!order) {
        throw new Error(`Cannot find order with id=${id}.`);
    }
    const updatedOrder = yield order.update(payload);
    return orderMapper(updatedOrder);
});
exports.updateByPk = updateByPk;
const updateWhere = (where, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order.findOne({
        include: [User, City, ClockType, Master],
        where
    });
    if (!order) {
        throw new Error(`Cannot find order.`);
    }
    const updatedOrder = yield order.update(payload);
    return orderMapper(updatedOrder);
});
exports.updateWhere = updateWhere;
const deleteByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCityCount = yield Order.destroy({
        where: { id }
    });
    return !!deletedCityCount;
});
exports.deleteByPk = deleteByPk;
const countWhere = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Order.count({ where });
});
exports.countWhere = countWhere;
//# sourceMappingURL=index.js.map