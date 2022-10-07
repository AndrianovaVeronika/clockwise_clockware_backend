import * as userService from "../user";
import * as nodemailer from "nodemailer";
import mailConfig from "../../config/mail.config";
import logger from "../../utils/logger";
import generateShortCode from "../shortCode";
import * as codeService from "../code";
import {getBcryptedPassword} from "../bcrypt";
import {OrderMailData} from "../../models/order/order.interface";
import validator from "validator";

const transporter = nodemailer.createTransport(mailConfig);

const sendStandardMail = async (to: string, subject: string, text: string, html?: string) => {
    logger.info('Retrieving email data...');
    const mailData = {
        from: process.env.EMAIL,  // sender address
        to,   // list of receivers
        subject,
        text,
        html
    };

    logger.info('Sending an email...');
    // for (const mailDataKey in mailData) {
    //     logger.info(mailDataKey + ': ' + mailData[mailDataKey]);
    // }
    await transporter.sendMail(mailData, (err, info) => {
        if (err) {
            throw new Error(`Send mail error: ${err}`);
        } else {
            throw new Error('Mail `ve been sent');
        }
    });
};

export const sendOrderConfirmationMail = async (mailData: OrderMailData) => {
    logger.info('Sending order confirmation mail...');
    let mail = '';
    for (const key in mailData) {
        if (key === 'isCompleted') {
            continue;
        }
        // logger.info(key + ': ' + mailData[key]);
        mail += '\n' + key + ': ' + mailData[key as keyof OrderMailData];
    }
    await sendStandardMail(mailData.email, 'Order `ve been registered successfully', 'Your order:\n' + mail);
};

export const sendEmailConfirmationMail = async (userId: number, userEmail: string) => {
    try {
        logger.info('Sending email verification mail...');
        const code = generateShortCode();
        const newCode = {
            verificationCode: code,
            userId
        };
        await codeService.create(newCode);
        const link = '"' + process.env.EMAIL_CONFIRMATION_PAGE_LINK + '/' + code + '"';
        const html = '<p>Click <a href=' + link + '>here</a> to prove your email. P.S. If link doesn`t work use it manually: ' + link + '</p>';
        await sendStandardMail(userEmail, 'Email confirmation', html);
    } catch (err) {
        throw new Error(`Send mail error: ${err}`);
    }
};

export const sendTemporaryPasswordMail = async (userId: number, userEmail: string) => {
    try {
        const code = generateShortCode();
        await userService.updateWhere({
            password: getBcryptedPassword(code),
            isPasswordTemporary: true
        }, {id: userId});
        const html = '<p>Your temporary password is <b>' + code + '</b>. Make sure to login and reset your password to change into your own one!</p>';
        await sendStandardMail(userEmail, 'Temporary password', html);
    } catch (err) {
        throw new Error(`Send mail error: ${err}`);
    }
};