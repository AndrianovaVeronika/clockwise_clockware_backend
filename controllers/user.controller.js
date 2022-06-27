const logger = require("../utils/logger");
const {User, Role, Sequelize} = require('../models');
const {getBcryptedPassword} = require("../services/bcrypt.service");
const Op = Sequelize.Op;

// Find all users
exports.findAll = async (req, res) => {
    logger.info('Retrieving all users...');
    try {
        const users = await User.findAll({
            attributes: {exclude: ['password']}
        });
        logger.info('Users retrieved');
        res.status(200).send(users);
    } catch (e) {
        logger.info('User find all: failure');
        res.status(500).send({
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
            logger.info('User found');
            res.status(200).send(user);
        } else {
            logger.info(`Cannot find user with id=${id}`);
            res.status(404).send({
                message: `Cannot find user with id=${id}.`
            });
        }
    } catch (e) {
        logger.info("Error retrieving user with id=" + id);
        res.status(500).send({
            message: "Error retrieving user with id=" + id
        });
    }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    logger.info(`Updating user with id=${id}...`);
    const userUpdateValues = {
        ...req.body,
        password: req.body.password ? getBcryptedPassword(req.body.password, 8) : undefined
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
        logger.info("User was updated successfully");
        res.status(200).send(user);
    } catch (e) {
        logger.info("Error updating user with id=" + id);
        logger.info(e.message);
        res.status(500).send({
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
        res.status(200).send({id: id});
    } catch (e) {
        logger.info("Could not delete user with id=");
        logger.info(e.message);
        res.status(500).send({
            message: "Could not delete user with id=" + id
        });
    }
};

//Creates user with specified roles, such as 'admin'
exports.create = async (req, res) => {
    logger.info('Creating user with specified roles...')
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: getBcryptedPassword(req.body.password, 8)
    }
    try {
        const user = await User.create(newUser);
        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            });
            await user.setRoles(roles);
        } else {
            await user.setRoles([1]);
        }

        logger.info('New user created');
        const createdUserWithRoles = await User.findByPk(user.id, {
            attributes: {exclude: ['password']}
        });
        res.status(200).send(createdUserWithRoles);
    } catch (e) {
        logger.info('Error in signup');
        res.status(500).send({message: e.message});
    }
}