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
exports.checkUserPassword = exports.checkUserName = exports.checkDuplicateEmail = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const userService = __importStar(require("../services/user"));
const checkDuplicateEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Email
    logger_1.default.info("Checking email for duplicates...");
    const userWithSameEmail = yield userService.findOneWhere({
        email: req.body.email
    });
    if (userWithSameEmail) {
        logger_1.default.error("Email is already in use!");
        return res.status(400).send({
            message: "Email is already in use!"
        });
    }
    logger_1.default.info("Email doesnt repeat. Heading next...");
    next();
});
exports.checkDuplicateEmail = checkDuplicateEmail;
const checkUserName = (req, res, next) => {
    logger_1.default.info("Checking user name...");
    if (req.body.name.length < 3) {
        return res.status(400).send({ message: 'Name is too short!' });
    }
    next();
};
exports.checkUserName = checkUserName;
const checkUserPassword = (req, res, next) => {
    logger_1.default.info("Checking user password...");
    if (req.body.password.length < 8) {
        return res.status(400).send({ message: 'Password is too short!' });
    }
    next();
};
exports.checkUserPassword = checkUserPassword;
//# sourceMappingURL=user.validator.js.map