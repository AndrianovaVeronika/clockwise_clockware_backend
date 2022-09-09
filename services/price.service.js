const logger = require("../utils/logger");
const {City} = require("../models");

const countPrice = async (cityId, clockTypeId) => {
    logger.info('Counting order price...');
    const city = await City.findByPk(cityId);
    return city.price * clockTypeId;
};

module.exports = {
    countPrice
}