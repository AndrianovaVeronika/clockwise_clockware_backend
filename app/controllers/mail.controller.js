const nodemailer = require('nodemailer');
const logger = require("../../utils/logger");
const config = require("../config/mail.config.js");

const transporter = nodemailer.createTransport(config);

exports.sendMail = (req, res) => {
    logger.info('Retrieving email data...');
    for (const configKey in config) {
        if(configKey === 'auth'){
            for (const authKey in config[configKey]) {
                logger.info(authKey + ': ' + config.auth[authKey]);
            }
        }
        logger.info(configKey + ': ' + config[configKey]);
    }

    if (!req.body) {
        res.status(500).send('')
    }
    const {to, subject, text} = req.body;

    const mailData = {
        from: process.env.EMAIL,  // sender address
        to: to,   // list of receivers
        subject: subject,
        text: text
    };

    logger.info('Sending an email...');
    for (const mailDataKey in mailData) {
        logger.info(mailDataKey + ': ' + mailData[mailDataKey]);
    }
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            logger.info('Send mail error: ', err);
            res.status(500).send('Sending mail `ve failed...');
        } else {
            logger.info('Mail `ve been sent');
            res.status(201).send('Mail `ve been sent');
        }
    });
}