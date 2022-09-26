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
exports.rateOrder = exports.findAllCurrentMasterOrders = exports.findAllCurrentUserOrders = exports.deleteByPk = exports.update = exports.findOne = exports.findAll = exports.create = void 0;
const price_1 = require("../../services/price");
const logger_1 = __importDefault(require("../../utils/logger"));
const orderService = __importStar(require("../../services/order"));
const masterService = __importStar(require("../../services/master"));
const ratingService = __importStar(require("../../services/rating"));
const mail_1 = require("../../services/mail");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate request
    logger_1.default.info('Creating order...');
    try {
        const countedPrice = yield (0, price_1.countPrice)(req.body.cityId, req.body.clockTypeId);
        const newOrder = {
            name: req.body.name,
            email: req.body.email,
            date: req.body.date,
            time: req.body.time,
            cityId: req.body.cityId,
            clockTypeId: req.body.clockTypeId,
            masterId: req.body.masterId,
            price: countedPrice
        };
        const createdOrder = yield orderService.create(newOrder);
        logger_1.default.info('Order have been created');
        // sending mail
        yield (0, mail_1.sendOrderConfirmationMail)(createdOrder);
        logger_1.default.info('Mail have been sent');
        return res.status(201).send(createdOrder);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.create = create;
// Retrieve all from the database.
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Retrieving all orders...');
    try {
        const orders = yield orderService.findAll({ includeDeleted: false });
        logger_1.default.info('Orders retrieved!');
        return res.status(200).send(orders);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.findAll = findAll;
// Find a single order with an id
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    logger_1.default.info(`Finding order with id=${id}...`);
    try {
        const order = yield orderService.findByPk(id);
        logger_1.default.info('Order has been found!');
        return res.status(200).send(order);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.findOne = findOne;
// Update a Tutorial by the id in the request
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    logger_1.default.info(`Updating order with id=${id}...`);
    try {
        const updatedOrder = yield orderService.updateByPk(id, req.body);
        logger_1.default.info("Order has been updated successfully!");
        return res.status(200).send(updatedOrder);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.update = update;
// Delete an order with the specified id in the request
const deleteByPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    logger_1.default.info(`Deleting order with id=${id}...`);
    try {
        const isDeleted = yield orderService.deleteByPk(id);
        if (!isDeleted) {
            return res.status(409).send({ message: 'Order can`t be deleted' });
        }
        logger_1.default.info("Order was deleted successfully!");
        return res.status(200).send({ id });
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.deleteByPk = deleteByPk;
const findAllCurrentUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    logger_1.default.info(`Retrieving all orders for user with id=${id}...`);
    try {
        const orders = yield orderService.findAll({ includeDeleted: true }, { userId: id });
        logger_1.default.info('Orders retrieved!');
        return res.status(200).send(orders);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.findAllCurrentUserOrders = findAllCurrentUserOrders;
const findAllCurrentMasterOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.masterId;
    logger_1.default.info(`Retrieving all orders for master with id=${id}...`);
    try {
        const orders = yield orderService.findAll({ includeDeleted: true }, { masterId: id });
        logger_1.default.info('Orders retrieved!');
        return res.status(200).send(orders);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.findAllCurrentMasterOrders = findAllCurrentMasterOrders;
const rateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Rating order...');
    try {
        const id = parseInt(req.params.id, 10);
        const targetOrder = yield orderService.findByPk(id);
        if (req.userId !== targetOrder.userId) {
            logger_1.default.error('User has no access to update order');
            res.status(400).send({ message: 'Authorized user has no access to update order' });
        }
        const newRating = yield ratingService.countMasterNewRating(req.body.rating, targetOrder.masterId);
        yield masterService.updateWhere({ id: targetOrder.masterId }, { rating: newRating });
        yield orderService.updateWhere({ id: targetOrder.id }, { rating: req.body.rating });
        logger_1.default.info('Order is rated. Master rating is updated.');
        return res.status(200).send(Object.assign(Object.assign({}, targetOrder), { rating: req.body.rating }));
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.rateOrder = rateOrder;
//# sourceMappingURL=index.js.map