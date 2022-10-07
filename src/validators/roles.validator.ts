import logger from "../utils/logger";
import * as userService from "../services/user";
import * as masterService from "../services/master";
import {NextFunction, Request, Response} from 'express';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info("Checking if user admin...");
        if (req.headers.special_admin_key === process.env.SPECIAL_ADMIN_KEY) {
            logger.info("User provided special admin key. Heading next...");
            next();
            return;
        }
        const user = await userService.findByPk(req.userId);
        if (user.roles.includes('admin')) {
            logger.info("User is admin.");
            next();
            return;
        }
        logger.info("Require Admin Role!");
        return res.status(403).send({message: "Require Admin Role!"});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

export const isMaster = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info("Checking if user master...");
        // if (req.headers['special_admin_key'] === process.env.SPECIAL_ADMIN_KEY) {
        //     logger.info("User provided special admin key. Heading next...");
        //     next();
        //     return;
        // }
        const user = await userService.findByPk(req.userId);
        if (user.roles.includes('master')) {
            logger.info("User is master.");
            const master = await masterService.findOneWhere({userId: user.id});
            req.masterId = master.id;
            next();
            return;
        }
        logger.info("Require master Role!");
        return res.status(403).send({message: "Require master Role!"});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};