const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require('../utils/logger');
const {getBcryptedPassword} = require("../services/bcrypt.service");

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