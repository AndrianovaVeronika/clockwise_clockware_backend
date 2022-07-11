const {User, ROLES} = require("../models");
const logger = require("../utils/logger");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    // Username
    logger.info("Checking username for duplicates...");
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });
    if (user) {
        logger.error("Username is already in use!");
        res.status(400).send({
            message: "Username is already in use!"
        });
        return;
    }
    // Email
    logger.info("Checking email for duplicates...");
    const userWithSameEmail = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (userWithSameEmail) {
        logger.error("Email is already in use!");
        res.status(400).send({
            message: "Email is already in use!"
        });
        return;
    }
    logger.info("Username and email dont repeat. Heading next...");
    next();
};

checkRolesExisted = (req, res, next) => {
    logger.info("Checking role existence...");
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                logger.error("Role does not exist - " + req.body.roles[i] + ".");
                res.status(400).send({
                    message: "Role does not exist - " + req.body.roles[i] + "."
                });
                return;
            }
        }
    }
    logger.info("Role exist! Heading next...");
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;