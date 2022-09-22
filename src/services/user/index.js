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
exports.deleteByPk = exports.updateWhere = exports.updateByPk = exports.create = exports.findOneWhere = exports.findByPk = exports.findAll = void 0;
const models_1 = __importDefault(require("../../models"));
const sequelize_1 = require("sequelize");
const { User, Role } = models_1.default.models;
const userMapper = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    emailChecked: user.emailChecked,
    isPasswordTemporary: user.isPasswordTemporary,
    roles: user.roles,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt
});
const findAll = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.findAll(Object.assign(Object.assign({ where: Object.assign({}, ((filters === null || filters === void 0 ? void 0 : filters.isDeleted) && { deletedAt: { [sequelize_1.Op.not]: null } })), include: [{
                model: Role,
                as: 'roles'
            }] }, ((filters === null || filters === void 0 ? void 0 : filters.excludePassword) && { attributes: { exclude: ['password'] } })), (((filters === null || filters === void 0 ? void 0 : filters.isDeleted) || (filters === null || filters === void 0 ? void 0 : filters.includeDeleted)) && { paranoid: true })));
    return users.map(userMapper);
});
exports.findAll = findAll;
const findByPk = (id, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findByPk(id, Object.assign({}, ((filters === null || filters === void 0 ? void 0 : filters.excludePassword) && { attributes: { exclude: ['password'] } })));
    const roles = yield user.getRoles();
    if (!user) {
        throw new Error(`Cannot find user with id=${id}.`);
    }
    return userMapper(user);
});
exports.findByPk = findByPk;
const findOneWhere = (where) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({
        where
    });
    if (!user) {
        throw new Error(`Cannot find user.`);
    }
    return userMapper(user);
});
exports.findOneWhere = findOneWhere;
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.create(payload);
    if (payload.roles) {
        yield user.setRoles(payload.roles);
    }
    return userMapper(user);
});
exports.create = create;
const updateByPk = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findByPk(id);
    if (!user) {
        throw new Error(`Cannot find user with id=${id}.`);
    }
    return userMapper(yield user.update(payload));
});
exports.updateByPk = updateByPk;
const updateWhere = (payload, where) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ where });
    if (!user) {
        throw new Error(`Cannot find user.`);
    }
    return userMapper(yield user.update(payload));
});
exports.updateWhere = updateWhere;
const deleteByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUserCount = yield User.destroy({
        where: { id }
    });
    return !!deletedUserCount;
});
exports.deleteByPk = deleteByPk;
//# sourceMappingURL=index.js.map