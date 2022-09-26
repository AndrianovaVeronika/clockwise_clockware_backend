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
exports.isMaster = exports.isAdmin = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const userService = __importStar(require("../services/user"));
const masterService = __importStar(require("../services/master"));
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("Checking if user admin...");
        if (req.headers.special_admin_key === process.env.SPECIAL_ADMIN_KEY) {
            logger_1.default.info("User provided special admin key. Heading next...");
            next();
            return;
        }
        const user = yield userService.findByPk(req.userId);
        if (user.roles.includes('admin')) {
            logger_1.default.info("User is admin.");
            next();
            return;
        }
        logger_1.default.info("Require Admin Role!");
        return res.status(403).send({ message: "Require Admin Role!" });
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.isAdmin = isAdmin;
const isMaster = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("Checking if user master...");
        // if (req.headers['special_admin_key'] === process.env.SPECIAL_ADMIN_KEY) {
        //     logger.info("User provided special admin key. Heading next...");
        //     next();
        //     return;
        // }
        const user = yield userService.findByPk(req.userId);
        if (user.roles.includes('master')) {
            logger_1.default.info("User is master.");
            const master = yield masterService.findOneWhere({ userId: user.id });
            req.masterId = master.id;
            next();
            return;
        }
        logger_1.default.info("Require master Role!");
        return res.status(403).send({ message: "Require master Role!" });
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.isMaster = isMaster;
//# sourceMappingURL=roles.validator.js.map