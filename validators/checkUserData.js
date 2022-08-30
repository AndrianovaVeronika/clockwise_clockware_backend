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

checkUserName = (req, res, next) => {
    logger.info("Checking user name...");
    if (req.body.name.length < 3) {
        return res.status(400).send({message: 'Name is too short!'});
    }
    next();
};

checkUserPassword = (req, res, next) => {
    logger.info("Checking user password...");
    if (req.body.password.length < 8) {
        return res.status(400).send({message: 'Password is too short!'});
    }
    next();
};

const checkUserData = {
    checkDuplicateEmail,
    checkUserName,
    checkUserPassword
};

module.exports = checkUserData;