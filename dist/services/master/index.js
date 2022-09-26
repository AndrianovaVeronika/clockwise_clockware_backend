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
const { Master, City } = models_1.default.models;
const masterMapper = (master) => ({
    id: master.id,
    name: master.name,
    rating: master.rating,
    cities: master.Cities.map((city) => city.name),
    userId: master.userId,
    createdAt: master.createdAt,
    updatedAt: master.updatedAt,
    // deletedAt: master.deletedAt
});
const findAll = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const masters = yield Master.findAll(Object.assign({ where: Object.assign({}, ((filters === null || filters === void 0 ? void 0 : filters.isDeleted) && { deletedAt: { [sequelize_1.Op.not]: null } })) }, (((filters === null || filters === void 0 ? void 0 : filters.isDeleted) || (filters === null || filters === void 0 ? void 0 : filters.includeDeleted)) && { paranoid: true })));
    return masters.map(masterMapper);
});
exports.findAll = findAll;
const findByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const master = yield Master.findByPk(id);
    if (!master) {
        throw new Error(`Cannot find city with id=${id}.`);
    }
    return masterMapper(master);
});
exports.findByPk = findByPk;
const findOneWhere = (where) => __awaiter(void 0, void 0, void 0, function* () {
    const master = yield Master.findOne({ where });
    if (!master) {
        throw new Error(`Cannot find city.`);
    }
    return masterMapper(master);
});
exports.findOneWhere = findOneWhere;
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const master = yield Master.create(payload);
    const cities = yield City.findAll({
        where: {
            name: {
                [sequelize_1.Op.or]: payload.cities
            }
        }
    });
    yield master.setCities(cities);
    const masterWithCities = yield Master.findByPk(master.id);
    return masterMapper(masterWithCities);
});
exports.create = create;
const updateByPk = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const master = yield Master.findByPk(id);
    if (!master) {
        throw new Error(`Cannot find city with id=${id}.`);
    }
    yield Master.update(payload, { where: { id } });
    if (payload.cities) {
        const cities = yield City.findAll({
            where: {
                name: {
                    [sequelize_1.Op.or]: payload.cities
                }
            }
        });
        yield master.setCities(cities);
    }
    const updatedMaster = yield Master.findByPk(master.id, { include: [City] });
    return masterMapper(updatedMaster);
});
exports.updateByPk = updateByPk;
const updateWhere = (where, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const master = yield Master.findOne({ where });
    if (!master) {
        throw new Error(`Cannot find city.`);
    }
    const updatedMaster = yield master.update(payload);
    if (payload.cities) {
        const cities = yield City.findAll({
            where: {
                name: {
                    [sequelize_1.Op.or]: payload.cities
                }
            }
        });
        yield master.setCities(cities);
    }
    return masterMapper(Object.assign(Object.assign({}, updatedMaster), { Cities: yield master.getCities() }));
});
exports.updateWhere = updateWhere;
const deleteByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedMasterCount = yield Master.destroy({
        where: { id }
    });
    return !!deletedMasterCount;
});
exports.deleteByPk = deleteByPk;
//# sourceMappingURL=index.js.map