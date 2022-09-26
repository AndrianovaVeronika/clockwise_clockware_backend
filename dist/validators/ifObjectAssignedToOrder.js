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
const logger_1 = __importDefault(require("../utils/logger"));
const orderService = __importStar(require("../services/order"));
const getOrderDependingOnModelId = (model, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orderService.findOneWhere({ [model + 'Id']: id });
});
const getModelValidator = (model) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        logger_1.default.info('Checking if ' + model + ' with id=' + id + ' can be deleted...');
        if (yield getOrderDependingOnModelId(model, id)) {
            logger_1.default.error(model[0].toUpperCase() + model.slice(1) + " is assigned to order. Delete can`t be complete");
            return res.status(400).send({
                message: model[0].toUpperCase() + model.slice(1) + " is assigned to order. Delete can`t be complete"
            });
        }
        next();
    });
};
exports.default = {
    city: getModelValidator('city'),
    master: getModelValidator('master'),
    user: getModelValidator('user')
};
//# sourceMappingURL=ifObjectAssignedToOrder.js.map