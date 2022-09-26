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
exports.sendTemporaryPasswordMail = exports.sendEmailConfirmationMail = exports.sendOrderConfirmationMail = void 0;
const userService = __importStar(require("../user"));
const nodemailer = __importStar(require("nodemailer"));
const mail_config_1 = __importDefault(require("../../config/mail.config"));
const logger_1 = __importDefault(require("../../utils/logger"));
const shortCode_1 = __importDefault(require("../shortCode"));
const codeService = __importStar(require("../code"));
const bcrypt_1 = require("../bcrypt");
const transporter = nodemailer.createTransport(mail_config_1.default);
const sendStandardMail = (to, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Retrieving email data...');
    const mailData = {
        from: process.env.EMAIL,
        to,
        subject,
        text,
        html
    };
    logger_1.default.info('Sending an email...');
    // for (const mailDataKey in mailData) {
    //     logger.info(mailDataKey + ': ' + mailData[mailDataKey]);
    // }
    yield transporter.sendMail(mailData, (err, info) => {
        if (err) {
            throw new Error(`Send mail error: ${err}`);
        }
        else {
            throw new Error('Mail `ve been sent');
        }
    });
});
const sendOrderConfirmationMail = (mailData) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Sending order confirmation mail...');
    let mail = '';
    for (const key in mailData) {
        if (key === 'isCompleted') {
            continue;
        }
        // logger.info(key + ': ' + mailData[key]);
        mail += '\n' + key + ': ' + mailData[key];
    }
    yield sendStandardMail(mailData.email, 'Order `ve been registered successfully', 'Your order:\n' + mail);
});
exports.sendOrderConfirmationMail = sendOrderConfirmationMail;
const sendEmailConfirmationMail = (userId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('Sending email verification mail...');
        const code = (0, shortCode_1.default)();
        const newCode = {
            verificationCode: code,
            userId
        };
        yield codeService.create(newCode);
        const link = '"' + process.env.EMAIL_CONFIRMATION_PAGE_LINK + '/' + code + '"';
        const html = '<p>Click <a href=' + link + '>here</a> to prove your email. P.S. If link doesn`t work use it manually: ' + link + '</p>';
        yield sendStandardMail(userEmail, 'Email confirmation', html);
    }
    catch (err) {
        throw new Error(`Send mail error: ${err}`);
    }
});
exports.sendEmailConfirmationMail = sendEmailConfirmationMail;
const sendTemporaryPasswordMail = (userId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = (0, shortCode_1.default)();
        yield userService.updateWhere({
            password: (0, bcrypt_1.getBcryptedPassword)(code),
            isPasswordTemporary: true
        }, { id: userId });
        const html = '<p>Your temporary password is <b>' + code + '</b>. Make sure to login and reset your password to change into your own one!</p>';
        yield sendStandardMail(userEmail, 'Temporary password', html);
    }
    catch (err) {
        throw new Error(`Send mail error: ${err}`);
    }
});
exports.sendTemporaryPasswordMail = sendTemporaryPasswordMail;
//# sourceMappingURL=index.js.map