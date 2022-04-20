const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const Role = db.Role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require('../utils/logger');

exports.signup = async (req, res) => {
    // Save User to Database
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    try {
        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            });
            await user.setRoles(roles);
            logger.info('New user created');
            res.status(200).send({message: "User was registered successfully!"});
        } else {
            // user role = 1
            logger.info('New user created');
            await user.setRoles([1]);
            res.status(200).send({message: "User was registered successfully!"});
        }
    } catch (e) {
        logger.info('Error in signup');
        res.status(500).send({message: e.message});
    }
};

exports.signin = async (req, res) => {
    logger.info('Signing in...');
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    try {
        if (!user) {
            logger.info('User not found');
            return res.status(404).send({message: "User Not found."});
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            logger.info('Password is not valid');
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
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
        logger.info('Signed in successfully!');
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    } catch (e) {
        logger.info('Error in signin');
        res.status(500).send({message: err.message});
    }
};

exports.userBoard = async (req, res) => {
    const id = req.userId;
    logger.info(`Finding user with id=${id}...`);
    const user = await User.findByPk(id);
    try {
        if (user) {
            logger.info('User found');
            const authorities = [];
            const roles = await user.getRoles();
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            logger.info('Signed in successfully!');
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                password: user.password
            });
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

// exports.adminBoard = (req, res) => {
//     res.status(200).send("admin access");
// };