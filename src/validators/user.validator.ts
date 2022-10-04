import logger from "../utils/logger";
import * as userService from "../services/user";
import {NextFunction, Request, Response} from 'express';

export const checkDuplicateEmail = async (req: Request, res: Response, next: NextFunction) => {
    // Email
    logger.info("Checking email for duplicates...");
    if (!req.body.email) {
        return res.status(400).send({
            message: "Email is not provided!"
        });
    }
    const userWithSameEmail = await userService.findOneWhere({
        email: req.body.email
    });
    if (userWithSameEmail) {
        logger.error("Email is already in use!");
        return res.status(400).send({
            message: "Email is already in use!"
        });
    }
    logger.info("Email doesnt repeat. Heading next...");
    next();
};

export const checkUserName = (req: Request, res: Response, next: NextFunction) => {
    logger.info("Checking user name...");
    if (req.body.name.length < 3) {
        return res.status(400).send({message: 'Name is too short!'});
    }
    next();
};

export const checkUserPassword = (req: Request, res: Response, next: NextFunction) => {
    logger.info("Checking user password...");
    if (req.body.password.length < 8) {
        return res.status(400).send({message: 'Password is too short!'});
    }
    next();
};