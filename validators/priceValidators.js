const logger = require("../utils/logger");
const {City, Price} = require("../models");
const _ = require("lodash");

checkNewPriceValues = async (req, res, next) => {
    try {
        logger.info('Checking income data for new price...');
        if (!req.body?.sum || !_.isNumber(req.body?.sum)) {
            return res.status(400).send({message: 'Sum of price is not stated or not a number'});
        }
        const ifCityExist = await City.findByPk(req.body.cityId);
        if (!req.body?.cityId || _.isNaN(req.body?.cityId || !ifCityExist)) {
            return res.status(400).send({message: 'Price`s city is not found'});
        }
        next();
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}

const priceValidators = {
    checkNewPriceValues
}

module.exports = priceValidators;