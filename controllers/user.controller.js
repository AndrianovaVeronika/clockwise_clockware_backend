const logger = require("../utils/logger");
const {User, Role, Sequelize, Code} = require('../models');
const {getBcryptedPassword} = require("../services/bcrypt.service");
const {createUserAccount} = require("../services/account.service");
const {generateShortCode} = require("../services/shortCode.service");
const {sendTemporaryPasswordMail} = require("../services/mail.service");
const Op = Sequelize.Op;

// Find all users
exports.findAll = async (req, res) => {
    logger.info('Retrieving all users...');
    try {
        const users = await User.findAll({
            attributes: {exclude: ['password']}
        });
        logger.info('Users retrieved!');
        return res.status(200).send(users);
    } catch (e) {
        logger.error("Some error occurred while retrieving users");
        return res.status(500).send({
            message: e.message || "Some error occurred while retrieving users"
        });
    }
};

// Find a user by the id in the request
exports.findOne = async (req, res) => {
    const id = req.params.id;
    logger.info(`Finding user with id=${id}...`);
    try {
        const user = await User.findByPk(id, {
            attributes: {exclude: ['password']}
        });
        user.roles = await user.getRoles();
        if (user) {
            logger.info('User found!');
            return res.status(200).send(user);
        } else {
            logger.info(`Cannot find user with id=${id}`);
            return res.status(400).send({
                message: `Cannot find user with id=${id}.`
            });
        }
    } catch (e) {
        logger.info("Error retrieving user with id=" + id + ".");
        return res.status(500).send({
            message: "Error retrieving user with id=" + id + "."
        });
    }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    logger.info(`Updating user with id=${id}...`);
    const userUpdateValues = req.body;
    if (userUpdateValues.password) {
        userUpdateValues.password = getBcryptedPassword(req.body.password, 8);
    }
    try {
        await User.update(userUpdateValues, {
            where: {id: id}
        });
        logger.info('User updated, trying to findOne...')
        const user = await User.findByPk(id, {
            attributes: {exclude: ['password']}
        });
        user.roles = await user.getRoles();
        logger.info("User was updated successfully!");
        return res.status(200).send(user);
    } catch (e) {
        logger.info("Error updating user with id=" + id);
        logger.info(e.message);
        return res.status(500).send({
            message: "Error updating user with id=" + id
        });
    }
};

// Delete a user by the id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    logger.info(`Deleting user with id=${id}...`);

    try {
        await User.destroy({
            where: {id: id}
        });
        logger.info("User was deleted successfully!");
        return res.status(200).send({id: id});
    } catch (e) {
        logger.info("Could not delete user with id=" + ".");
        logger.info(e.message);
        return res.status(500).send({
            message: "Could not delete user with id=" + id + "."
        });
    }
};

//Creates user with specified roles, such as 'admin'
exports.create = async (req, res) => {
    logger.info('Creating user with specified roles...');
    try {
        logger.info('Creating new user...');
        const createdUser = await createUserAccount(req.body);
        const shortCode = generateShortCode();
        await Code.create({verificationCode: shortCode, userId: createdUser.id});
        await sendTemporaryPasswordMail(shortCode, createdUser.email);
        logger.info('New user has been created');
        return res.status(200).send(createdUser);
    } catch (e) {
        logger.info('Error in signup');
        return res.status(500).send({message: e.message});
    }
}