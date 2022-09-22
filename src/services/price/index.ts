import logger from "../../utils/logger";
import db from "../../models";

const City = db.models.City;

export const countPrice = async (cityId: number, clockTypeId: number) => {
    logger.info('Counting order price...');
    const city = await City.findByPk(cityId);
    return city.price * clockTypeId;
};