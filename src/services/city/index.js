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
exports.deleteByPk = exports.updateByPk = exports.create = exports.findByPk = exports.findAll = void 0;
const models_1 = __importDefault(require("../../models"));
const sequelize_1 = require("sequelize");
const City = models_1.default.models.City;
const findAll = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    return yield City.findAll(Object.assign({ where: Object.assign({}, ((filters === null || filters === void 0 ? void 0 : filters.isDeleted) && { deletedAt: { [sequelize_1.Op.not]: null } })) }, (((filters === null || filters === void 0 ? void 0 : filters.isDeleted) || (filters === null || filters === void 0 ? void 0 : filters.includeDeleted)) && { paranoid: true })));
});
exports.findAll = findAll;
const findByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const city = yield City.findByPk(id);
    if (!city) {
        throw new Error(`Cannot find city with id=${id}.`);
    }
    return city;
});
exports.findByPk = findByPk;
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield City.create(payload);
});
exports.create = create;
const updateByPk = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const city = yield City.findByPk(id);
    if (!city) {
        throw new Error(`Cannot find city with id=${id}.`);
    }
    return yield city.update(payload);
});
exports.updateByPk = updateByPk;
const deleteByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCityCount = yield City.destroy({
        where: { id }
    });
    return !!deletedCityCount;
});
exports.deleteByPk = deleteByPk;
//# sourceMappingURL=index.js.map