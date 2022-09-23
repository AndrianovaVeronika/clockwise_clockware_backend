const logger = require("../utils/logger");
const {Order, User} = require("../models");
const bcrypt = require("bcryptjs");

const validatePasswordChange = async (req, res, next) => {
    try {
        logger.info("Checking if changing password is possible...");
        if (req.body.currentPassword) {
            const user = await User.findByPk(req.userId);
            const currPasswordIsValid = bcrypt.compareSync(
                req.body.currentPassword,
                user.password
            );
            logger.info(currPasswordIsValid);
            if (!currPasswordIsValid) {
                return res.status(400).send({message: 'Current password is not right.'})
            }
            logger.info(req.body.password);
            if (req.body.password === req.body.currentPassword) {
                return res.status(400).send({message: 'New password cannot be equal to previous.'})
            }
        }
        logger.info("Checked! Heading next...");
        next();
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

module.exports = validatePasswordChange;