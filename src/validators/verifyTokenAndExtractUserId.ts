import logger from "../utils/logger";
import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from 'express';
import config from "../config/auth.config";
import {verifyToken} from "../services/jwt";

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info("Verifying user token for access...");
        if (req.headers.special_admin_key === process.env.SPECIAL_ADMIN_KEY) {
            logger.info("User provided special admin key. Heading next...");
            next();
            return;
        }
        const token = req.headers["x-access-token"];
        if (!token) {
            logger.error("No token provided!");
            return res.status(400).send({message: "No token provided!"});
        }
        verifyToken(token.toString());
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};