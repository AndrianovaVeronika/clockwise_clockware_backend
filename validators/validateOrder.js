const logger = require("../utils/logger");

validateOrder = async (req, res, next) => {
    logger.info('Verifying order params...');
    if (!req.body) {
        res.status(400).send({message: 'Order add err: body undefined'});
        return;
    }
    //check date
    const minAllowedDate = new Date();
    const incomeDate = new Date(req.body.date);
    logger.info('min allowed date :' + minAllowedDate);
    logger.info('income date' + incomeDate);
    if (incomeDate <= minAllowedDate) {
        logger.info('Error: The date exceeds min date');
        res.status(500).send({message: 'Error: The date exceeds min date'});
        return;
    }
    next();
}

module.exports = {validateOrder};