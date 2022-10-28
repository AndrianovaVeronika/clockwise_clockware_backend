import {Request, Response} from 'express';
import logger from "../../utils/logger";
import * as clockTypeService from "../../services/clockType";
import * as cityService from "../../services/city";

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

export const findByPk = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info(`Finding city with id=${id}...`);
    try {
        const clockType = await clockTypeService.findByPk(id);
        if (!clockType) {
            logger.error(`Cannot find clockType with id=${id}.`);
            return res.status(400).send({
                message: `Cannot find clockType with id=${id}.`
            });
        }
        logger.info("ClockType has been found!");
        return res.status(200).send(clockType);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};