const nodemailer = require('nodemailer');
const logger = require("../utils/logger");
const config = require("../config/mail.config.js");
const {sendMail} = require("./mail.service");

const transporter = nodemailer.createTransport(config);

const sendStandartMail = (data) => {
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
}

const sendEmailConfirmationMail = async (shortCode, to) => {
    logger.info('Sending email verification mail...');
    const link = '"' + process.env.EMAIL_CONFIRMATION_PAGE_LINK + '/' + shortCode + '"';
    const html = '<p>Click <a href=' + link + '>here</a> to prove your email. P.S. If link doesn`t work use it manually: ' + link + '</p>';
    await sendStandartMail({
        to: to,
        subject: 'Email confirmation',
        html: html
    });
}

module.exports = {
    sendStandartMail,
    sendEmailConfirmationMail
}