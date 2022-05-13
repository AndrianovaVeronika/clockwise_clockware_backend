const logger = require('../utils/logger');

validateIfBodyUndefined = async (req, res, next) => {
    logger.info('Validating body...');
    if (!req.body) {
        res.status(400).send({message: 'Body undefined!'});
        return;
    }
    next();
}

module.exports = validateIfBodyUndefined;