const logger = require("../../utils/logger");
const {db} = require('../models');
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send('all access');
};
exports.userBoard = (req, res) => {
    const id = req.userId;
    logger.info(`Finding user with id=${id}...`);
    User.findByPk(id)
        .then(user => {
            if (user) {
                logger.info('User found');
                const authorities = [];
                user.getRoles().then(roles => {
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
                });
            } else {
                logger.info(`Cannot find user with id=${id}`);
                res.status(404).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        })
        .catch(err => {
            logger.info("Error retrieving user with id=" + id);
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
};
exports.adminBoard = (req, res) => {
    res.status(200).send("admin access");
};