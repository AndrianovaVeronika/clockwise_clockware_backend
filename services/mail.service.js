const nodemailer = require('nodemailer');
const logger = require("../utils/logger");
const config = require("../config/mail.config.js");
const {generateShortCode} = require("./shortCode.service");
const {Code, User} = require("../models");
const {getBcryptedPassword} = require("../services/bcrypt.service");

const transporter = nodemailer.createTransport(config);

const sendStandardMail = (data) => {
    logger.info('Retrieving email data...');
    if (!data) {
        logger.info('Mail data is empty');
    }
    const {to, subject, text, html} = data;
    const mailData = {
        from: process.env.EMAIL,  // sender address
        to: to,   // list of receivers
        subject: subject,
        text: text,
        html: html
    };

    logger.info('Sending an email...');
    for (const mailDataKey in mailData) {
        logger.info(mailDataKey + ': ' + mailData[mailDataKey]);
    }
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            logger.info('Send mail error: ', err);
        } else {
            logger.info('Mail `ve been sent');
        }
    });
};

const sendOrderConfirmationMail = async (mailData) => {
    logger.info('Sending order confirmation mail...');
    let mail = '';
    for (const key in mailData) {
        if (key === 'isCompleted') {
            continue;
        }
        // logger.info(key + ': ' + mailData[key]);
        mail += '\n' + key + ': ' + mailData[key];
    }
    await sendStandardMail({
        to: mailData.email,
        subject: 'Order `ve been registered successfully',
        text: 'Your order:\n' + mail,
    });
};

const sendEmailConfirmationMail = async (userId, userEmail) => {
    try {
        logger.info('Sending email verification mail...');
        const code = generateShortCode();
        await Code.create({verificationCode: code, userId: userId});
        const link = '"' + process.env.EMAIL_CONFIRMATION_PAGE_LINK + '/' + code + '"';
        const html = '<p>Click <a href=' + link + '>here</a> to prove your email. P.S. If link doesn`t work use it manually: ' + link + '</p>';
        await sendStandardMail({
            to: userEmail,
            subject: 'Email confirmation',
            html: html
        });
    } catch (err) {
        logger.info('Send mail error: ', err);
    }
};

const sendTemporaryPasswordMail = async (userId, userEmail) => {
    try {
        const code = generateShortCode();
        await User.update({password: getBcryptedPassword(code), isPasswordTemporary: true}, {where: {id: userId}});
        await sendStandardMail({
            to: userEmail,
            subject: 'Temporary password',
            html: '<p>Your temporary password is <b>' + code + '</b>. Make sure to login and reset your password to change into your own one!</p>'
        });
    } catch (err) {
        logger.info('Send mail error: ', err);
    }
};

module.exports = {
    sendEmailConfirmationMail,
    sendTemporaryPasswordMail,
    sendOrderConfirmationMail
};