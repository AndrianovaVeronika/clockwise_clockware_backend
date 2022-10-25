import logger from "../utils/logger";
import {NextFunction, Request, Response} from 'express';
import * as orderService from "../services/order";
import {parseIntToTimeString, parseTimeStringToInt} from "../services/parseTime";

export const ifDateTimeAppropriate = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Verifying if date and time are correct...');
    const minAllowedDate = new Date();
    const incomeDate = new Date(req.body.date);
    if (incomeDate <= minAllowedDate) {
        logger.error('The date exceeds min date.');
        return res.status(400).send({message: 'The date exceeds min date.'});
    }
    const minTime = 10;
    const maxTime = 18;
    const time = parseTimeStringToInt(req.body.time);
    if ((time < minTime) || (time > maxTime)) {
        logger.error('The time exceeds work hours.');
        return res.status(400).send({message: 'The time exceeds work hours.'});
    }
    logger.info('Date and time are correct. Heading next...');
    next();
}

export const ifOrderInterrogates = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Verifying order credentials...');
    const timeInNum = parseTimeStringToInt(req.body.time);
    // check if order exist
    try {
        for (let i = -3, ct = 3; i <= req.body.clockTypeId; i++, ct--) {
            const objToCompare = (i < 0) ? {
                date: req.body.date,
                time: parseIntToTimeString(timeInNum + i),
                masterId: req.body.masterId,
                clockTypeId: ct
            } : {
                date: req.body.date,
                time: parseIntToTimeString(timeInNum + i),
                masterId: req.body.masterId
            };
            const orders = await orderService.findAll({where: objToCompare});
            if (orders.data.length > 0) {
                logger.error('Order interrogates with other orders. Try to change date or time and pick master one more time.');
                return res.status(400).send({message: 'Order interrogates with other orders. Try to change date or time and pick master one more time.'});
            }
        }
        logger.info('Order credentials have been verified. Heading next...')
        next();
    } catch (e) {
        logger.error(e.message + ': Check order credentials.');
        return res.status(500).send({message: e.message + ': Check order credentials.'});
    }
}