"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteByPk = exports.update = exports.create = exports.findByPk = exports.findAll = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const cityService = __importStar(require("../../services/city"));
// Retrieve all cities from the database
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("Retrieving all cities...");
    try {
        const cities = yield cityService.findAll();
        logger_1.default.info("Cities retrieved!");
        return res.status(200).send(cities);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.findAll = findAll;
// Find a city with an id
const findByPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    logger_1.default.info(`Finding city with id=${id}...`);
    try {
        const city = yield cityService.findByPk(id);
        logger_1.default.info("City has been found!");
        return res.status(200).send(city);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.findByPk = findByPk;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("Creating city...");
    const newCity = {
        name: req.body.name,
        price: req.body.price
    };
    try {
        const city = yield cityService.create(newCity);
        logger_1.default.info("City created!");
        return res.status(201).send(city);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.create = create;
// Update a city by the id in the request
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    logger_1.default.info(`Updating city with id=${id}...`);
    const valuesToUpdate = {
        name: req.body.name,
        price: req.body.price
    };
    try {
        const createdCity = yield cityService.updateByPk(id, valuesToUpdate);
        logger_1.default.info("Index has been updated successfully.");
        return res.status(200).send(createdCity);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.update = update;
// Delete a city with the specified id in the request
const deleteByPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    logger_1.default.info(`Deleting city with id=${id}...`);
    try {
        yield cityService.deleteByPk(id);
        logger_1.default.info("City has been deleted successfully.");
        return res.status(200).send({ id });
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.deleteByPk = deleteByPk;
//# sourceMappingURL=index.js.map