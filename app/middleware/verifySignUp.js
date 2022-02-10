const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const logger = require('../../utils/logger');

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    logger.info('Checking username for duplicates...');
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            logger.info('Username duplicate found');
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
        // Email
        logger.info('Checking email for duplicates...');
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                logger.info('Email duplicate found');
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }
            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    logger.info('Checking role existance...');
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;