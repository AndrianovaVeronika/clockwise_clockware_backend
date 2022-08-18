const nodemailer = require('nodemailer');
const logger = require("../utils/logger");
const config = require("../config/mail.config.js");

const transporter = nodemailer.createTransport(config);

const generateShortCode = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

exports.sendMail = (data) => {
    logger.info('Retrieving email data...');
    if (!data) {
        logger.info('Mail data is empty');
    }
    const {to, subject, text, link} = data;

    const shortCode = generateShortCode();
    sessionStorage.setItem('verificationCode', shortCode);

    const mailData = {
        from: process.env.EMAIL,  // sender address
        to: to,   // list of receivers
        subject: subject,
        text: text,
        html: link ?
            '<p>Your code is <i>{shortCode}</i>. Enter this on your profile page to prove email. Your <a href={link}>profile page</a></p>'
            : undefined
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