const logger = require("../utils/logger");
const {User, Master} = require("../models");

isAdmin = async (req, res, next) => {
    try {
        logger.info("Checking if user admin...");
        if (req.headers['special_admin_key'] === process.env.SPECIAL_ADMIN_KEY) {
            logger.info("User provided special admin key. Heading next...");
            next();
            return;
        }
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                logger.info("User is admin.");
                next();
                return;
            }
        }
        logger.info("Require Admin Role!");
        return res.status(403).send({message: "Require Admin Role!"});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

isMaster = async (req, res, next) => {
    try {
        logger.info("Checking if user master...");
        // if (req.headers['special_admin_key'] === process.env.SPECIAL_ADMIN_KEY) {
        //     logger.info("User provided special admin key. Heading next...");
        //     next();
        //     return;
        // }
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'master') {
                logger.info("User is master.");
                const master = await Master.findOne({where: {userId: user.id}});
                req.masterId = master.id;
                next();
                return;
            }
        }
        logger.info("Require master Role!");
        return res.status(403).send({message: "Require master Role!"});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

module.exports = {
    isAdmin,
    isMaster
};