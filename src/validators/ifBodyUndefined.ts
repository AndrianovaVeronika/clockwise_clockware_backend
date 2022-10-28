import logger from "../utils/logger";
import {Request, Response, NextFunction} from 'express';

const ifBodyUndefined = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Validating body if undefined...");
    if (!req.body) {
        logger.error("Body undefined!");
        return res.status(400).send({message: "Body undefined!"});
    }
    logger.info("Body is defined. Heading next...");
    next();
};

export default ifBodyUndefined;