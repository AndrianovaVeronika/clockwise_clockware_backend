import logger from "../../utils/logger";
import * as cityService from "../city";

export const countPrice = async (cityId: number, clockTypeId: number): Promise<number> => {
    logger.info('Counting order price...');
    const city = await cityService.findByPk(cityId);
    return city.price * clockTypeId;
};