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
exports.create = exports.deleteByPk = exports.update = exports.findOne = exports.findAll = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const userService = __importStar(require("../../services/user"));
const codeService = __importStar(require("../../services/code"));
const bcrypt_1 = require("../../services/bcrypt");
const account_1 = require("../../services/account");
const shortCode_1 = __importDefault(require("../../services/shortCode"));
const mail_1 = require("../../services/mail");
// Find all users
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Retrieving all users...');
    try {
        const users = yield userService.findAll({ excludePassword: true });
        logger_1.default.info('Users retrieved!');
        return res.status(200).send(users);
    }
    catch (e) {
        logger_1.default.error("Some error occurred while retrieving users");
        return res.status(500).send({
            message: e.message || "Some error occurred while retrieving users"
        });
    }
});
exports.findAll = findAll;
// Find a user by the id in the request
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    logger_1.default.info(`Finding user with id=${id}...`);
    try {
        const user = yield userService.findByPk(id, { excludePassword: true });
        if (user) {
            logger_1.default.info('User found!');
            return res.status(200).send(user);
        }
        else {
            logger_1.default.info(`Cannot find user with id=${id}`);
            return res.status(400).send({
                message: `Cannot find user with id=${id}.`
            });
        }
    }
    catch (e) {
        logger_1.default.info("Error retrieving user with id=" + id + ".");
        return res.status(500).send({
            message: "Error retrieving user with id=" + id + "."
        });
    }
});
exports.findOne = findOne;
// Update a user by the id in the request
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId || parseInt(req.params.id, 10);
    logger_1.default.info(`Updating user with id=${id}...`);
    const userUpdateValues = req.body;
    if (userUpdateValues.password) {
        userUpdateValues.password = (0, bcrypt_1.getBcryptedPassword)(req.body.password);
        userUpdateValues.isPasswordTemporary = false;
    }
    try {
        yield userService.updateWhere(userUpdateValues, { id });
        logger_1.default.info('User updated, trying to findOne...');
        const user = yield userService.findByPk(id, { excludePassword: true });
        logger_1.default.info("User was updated successfully!");
        return res.status(200).send(user);
    }
    catch (e) {
        logger_1.default.info("Error updating user with id=" + id);
        logger_1.default.info(e.message);
        return res.status(500).send({
            message: "Error updating user with id=" + id
        });
    }
});
exports.update = update;
// Delete a user by the id in the request
const deleteByPk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    logger_1.default.info(`Deleting user with id=${id}...`);
    try {
        yield userService.deleteByPk(id);
        logger_1.default.info("User was deleted successfully!");
        return res.status(200).send({ id });
    }
    catch (e) {
        logger_1.default.info("Could not delete user with id=" + ".");
        logger_1.default.info(e.message);
        return res.status(500).send({
            message: "Could not delete user with id=" + id + "."
        });
    }
});
exports.deleteByPk = deleteByPk;
// Creates user with specified roles, such as 'admin'
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Creating user with specified roles...');
    try {
        logger_1.default.info('Creating new user...');
        const createdUser = yield (0, account_1.createUserAccount)(Object.assign(Object.assign({}, req.body), { isPasswordTemporary: true }));
        const shortCode = (0, shortCode_1.default)();
        yield codeService.create({ verificationCode: shortCode, userId: createdUser.id });
        yield (0, mail_1.sendTemporaryPasswordMail)(createdUser.id, createdUser.email);
        logger_1.default.info('New user has been created');
        return res.status(200).send(createdUser);
    }
    catch (e) {
        logger_1.default.info('Error in signup');
        return res.status(500).send({ message: e.message });
    }
});
exports.create = create;
//# sourceMappingURL=index.js.map