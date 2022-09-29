import logger from "../utils/logger";
import {NextFunction, Request, Response} from 'express';
import * as orderService from "../services/order";

export default async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    try {
        logger.info("Checking if order belong to master...");
        const order = await orderService.findByPk(id, {returnWithIds: true});
        if (order.masterId !== req.masterId) {
            logger.error('Master has no access to change this order!');
            return res.status(400).send({message: 'You have no access to change this order!'});
        }
        logger.info("Checked! Heading next...");
        next();
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};