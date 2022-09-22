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
exports.createUserOrFindIfAuthorized = exports.resetPassword = exports.checkEmailVerificationCode = exports.userAccess = exports.signin = exports.registerMaster = exports.registerUser = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const shortCode_1 = __importDefault(require("../../services/shortCode"));
const mail_1 = require("../../services/mail");
const account_1 = require("../../services/account");
const userService = __importStar(require("../../services/user"));
const codeService = __importStar(require("../../services/code"));
const bcrypt_1 = require("../../services/bcrypt");
const jwt_1 = require("../../services/jwt");
const moment_1 = __importDefault(require("moment"));
// Creates user account
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Creating user account...');
    try {
        const createdUser = yield (0, account_1.createUserAccount)(req.body);
        yield (0, mail_1.sendTemporaryPasswordMail)(createdUser.id, createdUser.email);
        return res.status(200).send(createdUser);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.registerUser = registerUser;
// Creates master account
const registerMaster = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Creating master account...');
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isPasswordTemporary: true
        };
        const newMaster = {
            name: req.body.name
        };
        const createdAccount = yield (0, account_1.createMasterAccount)(newUser, newMaster);
        yield (0, mail_1.sendTemporaryPasswordMail)(createdAccount.user.id, createdAccount.user.email);
        return res.status(200).send(createdAccount);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.registerMaster = registerMaster;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("Signing in...");
    try {
        const user = yield userService.findOneWhere({ email: req.body.email });
        if (!req.body.password) {
            logger_1.default.error("No password provided.");
            return res.status(401).send({ message: "No password provided." });
        }
        const passwordIsValid = (0, bcrypt_1.isPasswordValid)(req.body.password, user.password);
        if (!passwordIsValid) {
            logger_1.default.error("Check your credential: email or password could not be right");
            return res.status(401).send({
                accessToken: null,
                message: "Check your credential: email or password could not be right"
            });
        }
        const token = (0, jwt_1.generateToken)(user.id);
        logger_1.default.info('Signed in successfully');
        return res.status(200).send(Object.assign(Object.assign({}, user), { accessToken: token }));
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(401).send({ message: "Check your credential: email or password could not be right" });
    }
});
exports.signin = signin;
const userAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    logger_1.default.info(`Finding user with id=${id}...`);
    try {
        const user = yield userService.findByPk(id);
        logger_1.default.info("Authenticated successfully");
        return res.status(200).send(user);
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.userAccess = userAccess;
const checkEmailVerificationCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeRecord = yield codeService.findOneWhere({ verificationCode: req.params.code });
        const recordUpdateTime = (0, moment_1.default)(codeRecord.updatedAt);
        const now = (0, moment_1.default)();
        if (now.diff(recordUpdateTime, 'minutes') > 10) {
            logger_1.default.info('Code has been expired...');
            const user = yield userService.findByPk(codeRecord.userId);
            logger_1.default.info('Sending mail to prove email...');
            yield (0, mail_1.sendEmailConfirmationMail)(user.id, user.email);
            return res.status(200).send({
                isEmailValid: false,
                message: 'Code is expired! We have sent you new one on your email.'
            });
        }
        logger_1.default.info('Enabling email state to checked...');
        yield userService.updateWhere({ emailChecked: true }, { id: codeRecord.userId });
        return res.status(200).send({ isEmailValid: true, message: 'Email has been proved successfully' });
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.checkEmailVerificationCode = checkEmailVerificationCode;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    logger_1.default.info('Resetting password...');
    try {
        const user = yield userService.findByPk(id);
        const shortCode = (0, shortCode_1.default)();
        yield userService.updateWhere({ password: (0, bcrypt_1.getBcryptedPassword)(shortCode) }, { id: user.id });
        yield (0, mail_1.sendTemporaryPasswordMail)(user.id, user.email);
        logger_1.default.info('Password has been reset');
        return res.status(200).send({ message: 'Password has been reset' });
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
});
exports.resetPassword = resetPassword;
const createUserOrFindIfAuthorized = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Verifying if such user already exist...');
    const userToFind = {
        name: req.body.name,
        email: req.body.email
    };
    try {
        const user = yield userService.findOneWhere(userToFind);
        if (!user) {
            const createdUser = yield (0, account_1.createUserAccount)(req.body);
            yield (0, mail_1.sendTemporaryPasswordMail)(createdUser.id, createdUser.email);
            logger_1.default.info('User has been created as new. Heading next...');
        }
        else {
            logger_1.default.info('Such user has been found. Checking authorization...');
            const token = req.headers["x-access-token"];
            const error = (0, jwt_1.verifyToken)(token.toString());
            if (error) {
                return res.status(401).send({
                    message: 'Log in and proof your email',
                    code: 401
                });
            }
        }
        logger_1.default.info('User authorized or created as new');
        res.status(200).send(user);
    }
    catch (e) {
        logger_1.default.error(e.message + ': Check user credentials.');
        return res.status(400).send({ message: e.message + ': Check user credentials.' });
    }
});
exports.createUserOrFindIfAuthorized = createUserOrFindIfAuthorized;
//# sourceMappingURL=index.js.map