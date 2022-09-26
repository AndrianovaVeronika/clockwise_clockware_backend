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
exports.ifOrderInterrogates = exports.ifDateTimeAppropriate = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const orderService = __importStar(require("../services/order"));
const parseTime_1 = require("../services/parseTime");
const ifDateTimeAppropriate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Verifying if date and time are correct...');
    const minAllowedDate = new Date();
    const incomeDate = new Date(req.body.date);
    if (incomeDate <= minAllowedDate) {
        logger_1.default.error('The date exceeds min date.');
        return res.status(400).send({ message: 'The date exceeds min date.' });
    }
    const minTime = 10;
    const maxTime = 18;
    const time = (0, parseTime_1.parseTimeStringToInt)(req.body.time);
    if ((time < minTime) || (time > maxTime)) {
        logger_1.default.error('The time exceeds work hours.');
        return res.status(400).send({ message: 'The time exceeds work hours.' });
    }
    logger_1.default.info('Date and time are correct. Heading next...');
    next();
});
exports.ifDateTimeAppropriate = ifDateTimeAppropriate;
const ifOrderInterrogates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Verifying order credentials...');
    const timeInNum = (0, parseTime_1.parseTimeStringToInt)(req.body.time);
    // check if order exist
    try {
        for (let i = -3, ct = 3; i <= req.body.clockTypeId; i++, ct--) {
            const objToCompare = {
                date: req.body.date,
                time: (0, parseTime_1.parseIntToTimeString)(timeInNum + i),
                cityId: req.body.cityId,
                masterId: req.body.masterId,
                clockTypeId: Number()
            };
            if (i < 0) {
                objToCompare.clockTypeId = ct;
            }
            const orders = yield orderService.findAll({}, objToCompare);
            if (orders.length > 0) {
                logger_1.default.error('Order interrogates with other orders. Try to change date or time and pick master one more time.');
                return res.status(400).send({ message: 'Order interrogates with other orders. Try to change date or time and pick master one more time.' });
            }
        }
        logger_1.default.info('Order credentials have been verified. Heading next...');
        next();
    }
    catch (e) {
        logger_1.default.error(e.message + ': Check order credentials.');
        return res.status(500).send({ message: e.message + ': Check order credentials.' });
    }
});
exports.ifOrderInterrogates = ifOrderInterrogates;
//# sourceMappingURL=order.validator.js.map