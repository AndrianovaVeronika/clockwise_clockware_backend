const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const Code = db.Code;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require('../utils/logger');
const {sendEmailConfirmationMail, sendTemporaryPasswordMail} = require("../services/mail.service");
const {generateShortCode} = require("../services/shortCode.service");
const moment = require("moment");
const {createUserAccount, createMasterAccount} = require("../services/account.service");
const {getBcryptedPassword} = require("../services/bcrypt.service");

//Creates user account
exports.registerUser = async (req, res) => {
    logger.info('Creating user account...');
    try {
        const createdUser = await createUserAccount(req.body);
        const shortCode = generateShortCode();
        await Code.create({verificationCode: shortCode, userId: createdUser.id});
        await sendEmailConfirmationMail(shortCode, req.body.email);
        return res.status(200).send(createdUser);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

//Creates master account
exports.registerMaster = async (req, res) => {
    logger.info('Creating master account...');
    try {
        const createdMasterAccount = await createMasterAccount(req.body);
        const shortCode = generateShortCode();
        await Code.create({verificationCode: shortCode, userId: createdMasterAccount.user.id});
        await sendEmailConfirmationMail(shortCode, createdMasterAccount.user.email);
        return res.status(200).send(createdMasterAccount);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

exports.signin = async (req, res) => {
    logger.info("Signing in...");
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            logger.error("Check your credential: email or password could not be right");
            return res.status(401).send({message: "Check your credential: email or password could not be right"});
        }
        if (!req.body.password) {
            logger.error("No password provided.");
            return res.status(401).send({message: "No password provided."});
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            logger.error("Check your credential: email or password could not be right");
            return res.status(401).send({
                accessToken: null,
                message: "Check your credential: email or password could not be right"
            });
        }
        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        const authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        logger.info('Signed in successfully');
        return res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            roles: authorities,
            emailChecked: user.emailChecked,
            isPasswordTemporary: user.isPasswordTemporary,
            accessToken: token
        });
    } catch (e) {
        logger.error(e.message);
        return res.status(401).send({message: "Check your credential: email or password could not be right"});
    }
};

exports.userAccess = async (req, res) => {
    const id = req.userId;
    logger.info(`Finding user with id=${id}...`);
    try {
        const user = await User.findByPk(id);
        if (!user) {
            logger.error('User has not been found.');
            return res.status(400).send({message: "User has not been found."});
        }
        logger.info('User has been found');
        const authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        logger.info("Authenticated successfully");
        return res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            roles: authorities,
            isPasswordTemporary: user.isPasswordTemporary,
            emailChecked: user.emailChecked,
        });
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

exports.checkEmailVerificationCode = async (req, res) => {
    try {
        const codeRecord = await Code.findOne({
            where: {
                verificationCode: req.params.code
            }
        });
        const recordUpdateTime = moment(codeRecord.updatedAt);
        const now = new moment();
        if (now.diff(recordUpdateTime, 'minutes') > 10) {
            logger.info('Code has been expired...');
            const user = await codeRecord.getUser();
            logger.info('Sending mail to prove email...');
            const shortCode = generateShortCode();
            await Code.update({verificationCode: shortCode}, {
                where: {
                    userId: user.id
                }
            });
            await sendEmailConfirmationMail(shortCode, user.email);
            return res.status(200).send({
                isEmailValid: false,
                message: 'Code is expired! We have sent you new one on your email.'
            });
        }
        logger.info('Enabling email state to checked...');
        await User.update({emailChecked: true}, {where: {id: codeRecord.userId}});
        return res.status(200).send({isEmailValid: true, message: 'Email has been proved successfully'});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}

exports.resetPassword = async (req, res) => {
    logger.info('Resetting pass word...');
    try {
        const user = await User.findByPk(req.params.id);
        const shortCode = generateShortCode();
        await User.update({password: getBcryptedPassword(shortCode)}, {where: {id: user.id}});
        await sendTemporaryPasswordMail(shortCode, user.email);
        logger.info('Password has been reset');
        return res.status(200).send({message: 'Password has been reset'});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}

exports.createUserOrFindIfAuthorized = async (req, res) => {
    logger.info('Verifying if such user already exist...');
    const userToFind = {
        name: req.body.name,
        email: req.body.email
    }
    try {
        const [user, isUserCreated] = await User.findOrCreate({
            where: userToFind,
            defaults: userToFind
        });
        if (isUserCreated) {
            await user.setRoles([1]);
            const shortCode = generateShortCode();
            await sendTemporaryPasswordMail(shortCode, user.email);
            await User.update({password: getBcryptedPassword(shortCode)}, {where: {id: user.id}});
            const shortCode2 = generateShortCode();
            await Code.create({verificationCode: shortCode2, userId: user.id});
            await sendEmailConfirmationMail(shortCode2, user.email);
            logger.info('User has been created as new. Heading next...');
        } else {
            logger.info('Such user has been found. Checking authorization...');
            const token = req.headers["x-access-token"];
            const error = {};
            jwt.verify(token, config.secret, async (err, decoded) => {
                if (err) {
                    logger.info('error');
                    if (user.emailChecked) {
                        error.message = 'Log in before placing new order!';
                    } else {
                        error.message = 'Your email is unchecked. Please check your email for confirmation letter';
                    }
                } else if (decoded?.id !== user.id) {
                    error.message = "User authorized but name and email belong to another user";
                }
            });
            if (error.message) {
                logger.error(error.message);
                return res.status(401).send({
                    message: error.message,
                    code: 401
                });
            }
        }
        logger.info('User authorized or created as new');
        res.status(200).send(user);
    } catch (e) {
        logger.error(e.message + ': Check user credentials.');
        return res.status(400).send({message: e.message + ': Check user credentials.'});
    }
}

// exports.changePassword = async (req, res) => {
//     logger.info('Changing password...');
//     try {
//         const user = await User.findByPk(req.params.id);
//         await User.update({password: getBcryptedPassword(req.password)}, {where: {id: user.id}});
//     } catch (e) {
//         logger.error(e.message);
//         return res.status(500).send({message: e.message});
//     }
// }