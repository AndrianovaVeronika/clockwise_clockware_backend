const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const Order = db.Order;
const Code = db.Code;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require('../utils/logger');
const {getBcryptedPassword} = require("../services/bcrypt.service");
const {Master, City} = require("../models");
const _ = require("lodash");
const {sendMail} = require("../services/mail.service");
const {generateShortCode} = require("../services/shortCode.service");
const moment = require("moment");

exports.signup = async (req, res) => {
    // Save User to Database
    logger.info('Signing up...');
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: getBcryptedPassword(req.body.password, 8)
    }
    try {
        const user = await User.create(newUser);
        await user.setRoles([1]);
        const createdUserWithRoles = await User.findByPk(user.id, {
            attributes: {exclude: ['password']}
        });
        logger.info('New user created');
        return res.status(200).send(createdUserWithRoles);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

//Creates master account
exports.createMasterAccount = async (req, res) => {
    logger.info('Creating master account...')
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: getBcryptedPassword(req.body.password, 8)
    }
    const newMaster = {
        name: req.body.name
    }
    try {
        logger.info('Finding or creating master...');
        let [master, isNew] = await Master.findOrCreate({
            where: {name: newMaster.name},
            defaults: newMaster
        });
        const cities = await City.findAll({
            where: {
                name: {
                    [Op.or]: req.body.cities
                }
            }
        })
        if (isNew) {
            logger.info('New master has been created! Setting cities...');
            await master.setCities(cities);
        } else {
            logger.info('Master may exist. Checking...');
            const citiesToCompare = await master.getCities();
            if ((!citiesToCompare || !_.isEqual(citiesToCompare.map(city => ({id: city.id, name: city.name})),
                cities.map(city => ({id: city.id, name: city.name})))) && !master.userId) {
                logger.info('Master is not the right one! Creating new...');
                master = await Master.create(newMaster);
                await master.setCities(cities);
            }
        }
        logger.info('Creating new user...')
        const user = await User.create(newUser);
        await user.setRoles([1, 3]);
        logger.info('User has been created with id=' + user.id);
        await Master.update({userId: user.id}, {where: {id: master.id}});
        const createdUserWithRoles = await User.findByPk(user.id, {
            attributes: {exclude: ['password']}
        });
        logger.info('New master account created');
        logger.info('Sending mail to prove email...');
        const shortCode = generateShortCode();
        await Code.create({verificationCode: shortCode, userId: user.id});
        const link = process.env.EMAIL_CONFIRMATION_PAGE_LINK + '/' + shortCode;
        await sendMail({
            to: user.email,
            subject: 'Email confirmation',
            html: '<p>Click <a href={link}>here</a> to prove your email</p>'
        });
        return res.status(200).send({
            user: createdUserWithRoles,
            master: master
        });
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
        logger.info(req.body.password + ' = ' + user.password)
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
            username: user.username,
            email: user.email,
            roles: authorities,
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
            username: user.username,
            email: user.email,
            roles: authorities
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
            logger.info('Code has been expired...')
            const user = await codeRecord.getUser();
            logger.info('Sending mail to prove email...');
            const shortCode = generateShortCode();
            await Code.update({verificationCode: shortCode}, {
                where: {
                    userId: user.id
                }
            });
            const link = process.env.EMAIL_CONFIRMATION_PAGE_LINK + '/' + shortCode;
            await sendMail({
                to: user.email,
                subject: 'Email confirmation',
                html: '<p>Click <a href={link}>here</a> to prove your email</p>'
            });
            return res.status(200).send({
                isEmailValid: false,
                message: 'Code is expired! We have sent you new one on your email.'
            });
        }
        logger.info('Enabling email state to checked...');
        logger.info(codeRecord.userId)
        await User.update({emailChecked: true}, {where: {id: codeRecord.userId}});
        return res.status(200).send({isEmailValid: true, message: 'Email has been proved successfully'});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}