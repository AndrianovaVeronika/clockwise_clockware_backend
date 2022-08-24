const {User, ROLES} = require("../models");
const logger = require("../utils/logger");

checkDuplicateEmail = async (req, res, next) => {
    // Email
    logger.info("Checking email for duplicates...");
    const userWithSameEmail = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (userWithSameEmail) {
        logger.error("Email is already in use!");
        return res.status(400).send({
            message: "Email is already in use!"
        });
    }
    logger.info("Email doesnt repeat. Heading next...");
    next();
};

checkRolesExisted = (req, res, next) => {
    logger.info("Checking role existence...");
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                logger.error("Role does not exist - " + req.body.roles[i] + ".");
                return res.status(400).send({
                    message: "Role does not exist - " + req.body.roles[i] + "."
                });
            }
        }
    }
    logger.info("Role exist! Heading next...");
    next();
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;