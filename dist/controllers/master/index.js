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
exports.findAllMastersAvailable = exports.deleteByPk = exports.update = exports.findByPk = exports.findAll = exports.create = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const moment_1 = __importDefault(require("moment"));
const accountService = __importStar(require("../../services/account"));
const masterService = __importStar(require("../../services/master"));
const cityService = __importStar(require("../../services/city"));
const orderService = __importStar(require("../../services/order"));
const mail_1 = require("../../services/mail");
const parseTime_1 = require("../../services/parseTime");
// Creates master with account
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Creating new master...');
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isPasswordTemporary: true
        };
        const newMaster = {
            name: req.body.name,
            rating: req.body.rating,
            cities: req.body.cities
        };
        const createdAccount = yield accountService.createMasterAccount(newUser, newMaster);
        yield (0, mail_1.sendTemporaryPasswordMail)(createdAccount.user.id, createdAccount.user.email);
        logger_1.default.info('New master has been created');
        return res.status(201).send(createdAccount);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.create = create;
// Retrieve all from the database.
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Retrieving all masters...');
    try {
        const masters = yield masterService.findAll();
        logger_1.default.info('Masters retrieved!');
        return res.status(200).send(masters);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.findAll = findAll;
// Find a single master with an id
const findByPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    logger_1.default.info(`Finding master with id=${id}...`);
    try {
        const master = yield masterService.findByPk(id);
        logger_1.default.info('Master has been found!');
        return res.status(200).send(master);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.findByPk = findByPk;
// Update a Tutorial by the id in the request
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    logger_1.default.info(`Updating master with id=${id}...`);
    try {
        const master = yield masterService.updateWhere({ id }, req.body);
        logger_1.default.info("Master was updated successfully!");
        return res.status(200).send(master);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.update = update;
// Delete a master with the specified id in the request
const deleteByPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    logger_1.default.info(`Deleting master with id=${id}...`);
    try {
        yield masterService.deleteByPk(id);
        logger_1.default.info("Master was deleted successfully!");
        return res.status(200).send({ id });
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.deleteByPk = deleteByPk;
// Return available masters
const findAllMastersAvailable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Filtering all available masters...');
    try {
        const newOrder = {
            date: req.body.date,
            time: req.body.time,
            cityId: req.body.cityId,
            clockTypeId: req.body.clockTypeId
        };
        const incomeMasters = yield masterService.findAll();
        const city = yield cityService.findByPk(newOrder.cityId);
        const masters = incomeMasters.filter(master => master.cities.includes(city.name));
        const orders = yield orderService.findAll();
        const ifOrdersInterrogates = (newOrderStartTime, newOrderRepairingTime, existingOrderStartTime, existingOrderRepairingTime) => {
            const existingOrderStartTimeInNum = (0, parseTime_1.parseTimeStringToInt)(existingOrderStartTime);
            const newOrderStartTimeInNum = (0, parseTime_1.parseTimeStringToInt)(newOrderStartTime);
            if (newOrderStartTimeInNum < existingOrderStartTimeInNum) {
                if ((newOrderStartTimeInNum + newOrderRepairingTime) < existingOrderStartTimeInNum) {
                    return false;
                }
            }
            else {
                if (existingOrderStartTimeInNum + existingOrderRepairingTime < newOrderStartTimeInNum) {
                    return false;
                }
            }
            return true;
        };
        const getRepairingHours = (type) => {
            switch (type) {
                case 'small':
                    return 1;
                case 'average':
                    return 2;
                case 'big':
                    return 3;
                default:
                    return 0;
            }
        };
        logger_1.default.info('Starting retrieving busy masters...');
        const busyMasters = new Array();
        for (const order of orders) {
            if ((0, moment_1.default)(newOrder.date).format('MM-DD-YYYY') !== (0, moment_1.default)(order.date).format('MM-DD-YYYY')) {
                continue;
            }
            // if chosen time interrogates with existing order time add master to busy masters list
            if (ifOrdersInterrogates(newOrder.time, newOrder.clockTypeId, order.time, getRepairingHours(order.clockType))) {
                busyMasters.push(order.master);
            }
        }
        const availableMasters = masters.filter((master) => !busyMasters.includes(master.name));
        logger_1.default.info('All available masters have been retrieved!');
        return res.status(200).send(availableMasters);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.findAllMastersAvailable = findAllMastersAvailable;
//# sourceMappingURL=index.js.map