import {NextFunction, Response, Request} from "express";
import logger from "../utils/logger";
import * as bcryptService from "../services/bcrypt";
import * as userService from "../services/user";

const validatePasswordChange = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info("Checking if changing password is possible...");
        if (req.body.currentPassword) {
            const user = await userService.findByPk(req.userId);
            const currPasswordIsValid = bcryptService.isPasswordValid(
                req.body.currentPassword,
                user.password
            );
            if (!currPasswordIsValid) {
                return res.status(400).send({message: 'Current password is not right.'})
            }
            if (req.body.password === req.body.currentPassword) {
                return res.status(400).send({message: 'New password cannot be equal to previous.'})
            }
        }
        logger.info("Checked! Heading next...");
        next();
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

module.exports = validatePasswordChange;