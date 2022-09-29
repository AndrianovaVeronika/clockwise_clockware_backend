import logger from "../utils/logger";
import {NextFunction, Request, Response} from 'express';
import jwt from "jsonwebtoken";
import config from "../config/auth.config";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info("Verifying user token for access...");
        if (req.headers.special_admin_key === process.env.SPECIAL_ADMIN_KEY) {
            logger.info("User provided special admin key. Heading next...");
            return next();
        }
        const token = req.headers["x-access-token"];
        if (!token) {
            logger.error("No token provided!");
            return res.status(400).send({message: "No token provided!"});
        }
        if (typeof token === "string") {
            jwt.verify(token, config.secret, async (err: Error, decoded: any) => {
                if (err) {
                    logger.error(err);
                    return res.status(401).send({message: err});
                }
                req.userId = decoded.id;
            });
        }
        next();
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};