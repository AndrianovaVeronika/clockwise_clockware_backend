const nodemailer = require('nodemailer');
const logger = require("../utils/logger");
const config = require("../config/mail.config.js");

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
}

const sendEmailConfirmationMail = async (shortCode, recipientEmail) => {
    logger.info('Sending email verification mail...');
    const link = '"' + process.env.EMAIL_CONFIRMATION_PAGE_LINK + '/' + shortCode + '"';
    const html = '<p>Click <a href=' + link + '>here</a> to prove your email. P.S. If link doesn`t work use it manually: ' + link + '</p>';
    await sendStandardMail({
        to: recipientEmail,
        subject: 'Email confirmation',
        html: html
    });
}

const sendTemporaryPasswordMail = async (shortCode, recipientEmail) => {
    await sendStandardMail({
        to: recipientEmail,
        subject: 'Temporary password',
        html: '<p>Your temporary password is <b>' + shortCode + '</b>. Make sure to login and reset your password to change into your own one!</p>'
    });
}

module.exports = {
    sendEmailConfirmationMail,
    sendTemporaryPasswordMail
}