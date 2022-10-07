import {Request, Response} from 'express';
import logger from "../../utils/logger";
import * as clockTypeService from "../../services/clockType";

export const findAll = async (req: Request, res: Response) => {
    logger.info("Retrieving all clocktypes...");
    try {
        const clockTypes = await clockTypeService.findAll();
        logger.info("Clocktypes retrieved!");
        return res.status(200).send(clockTypes);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};