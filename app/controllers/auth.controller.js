const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require('../../utils/logger');

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        logger.info('New user created');
                        res.status(200).send({message: "User was registered successfully!"});
                    });
                });
            } else {
                // user role = 1
                logger.info('New user created');
                user.setRoles([1]).then(() => {
                    res.status(200).send({message: "User was registered successfully!"});
                });
            }
        })
        .catch(err => {
            logger.info('Error in signup');
            res.status(500).send({message: err.message});
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
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
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            logger.info('Error in signin');
            res.status(500).send({message: err.message});
        });
};

exports.findAll = (req, res) => {
    logger.info('Retrieving all users...');
    User.findAll()
        .then(data => {
            logger.info('Users retrieved');
            res.status(200).send(data);
        })
        .catch(err => {
            logger.info('User find all: failure');
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users"
            });
        });
};