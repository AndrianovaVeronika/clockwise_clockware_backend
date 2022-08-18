const nodemailer = require('nodemailer');
const logger = require("../utils/logger");
const config = require("../config/mail.config.js");

const transporter = nodemailer.createTransport(config);

exports.sendMail = (data) => {
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