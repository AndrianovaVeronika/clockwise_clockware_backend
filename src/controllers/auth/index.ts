import {Request, Response} from 'express';
import logger from "../../utils/logger";
import generateShortCode from "../../services/shortCode";
import {sendEmailConfirmationMail, sendTemporaryPasswordMail} from "../../services/mail";
import {createMasterAccount, createUserAccount} from "../../services/account";
import * as userService from "../../services/user";
import * as codeService from "../../services/code";
import {getBcryptedPassword, isPasswordValid} from "../../services/bcrypt";
import {generateToken, verifyToken} from "../../services/jwt";
import moment from "moment";

// Creates user account
export const registerUser = async (req: Request, res: Response) => {
    logger.info('Creating user account...');
    try {
        const createdUser = await createUserAccount(req.body);
        await sendTemporaryPasswordMail(createdUser.id, createdUser.email);
        return res.status(200).send(createdUser);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Creates master account
export const registerMaster = async (req: Request, res: Response) => {
    logger.info('Creating master account...');
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isPasswordTemporary: true
        };
        const newMaster = {
            name: req.body.name
        };
        const createdAccount = await createMasterAccount(newUser, newMaster);
        await sendTemporaryPasswordMail(createdAccount.user.id, createdAccount.user.email);
        return res.status(200).send(createdAccount);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

export const signin = async (req: Request, res: Response) => {
    logger.info("Signing in...");
    try {
        const user = await userService.findOneWhere({email: req.body.email});
        if (!req.body.password) {
            logger.error("No password provided.");
            return res.status(401).send({message: "No password provided."});
        }
        const passwordIsValid = isPasswordValid(req.body.password, user.password);
        if (!passwordIsValid) {
            logger.error("Check your credential: email or password could not be right");
            return res.status(401).send({
                accessToken: null,
                message: "Check your credential: email or password could not be right"
            });
        }
        const token = generateToken(user.id);
        logger.info('Signed in successfully');
        return res.status(200).send({...user, accessToken: token});
    } catch (e) {
        logger.error(e.message);
        return res.status(401).send({message: "Check your credential: email or password could not be right"});
    }
};

export const userAccess = async (req: Request, res: Response) => {
    const id = req.userId;
    logger.info(`Finding user with id=${id}...`);
    try {
        const user = await userService.findByPk(id);
        logger.info("Authenticated successfully");
        return res.status(200).send(user);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

export const checkEmailVerificationCode = async (req: Request, res: Response) => {
    try {
        const codeRecord = await codeService.findOneWhere({verificationCode: req.params.code});
        const recordUpdateTime = moment(codeRecord.updatedAt);
        const now = moment();
        if (now.diff(recordUpdateTime, 'minutes') > 10) {
            logger.info('Code has been expired...');
            const user = await userService.findByPk(codeRecord.userId);
            logger.info('Sending mail to prove email...');
            await sendEmailConfirmationMail(user.id, user.email);
            return res.status(200).send({
                isEmailValid: false,
                message: 'Code is expired! We have sent you new one on your email.'
            });
        }
        logger.info('Enabling email state to checked...');
        await userService.updateWhere({emailChecked: true}, {id: codeRecord.userId});
        return res.status(200).send({isEmailValid: true, message: 'Email has been proved successfully'});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info('Resetting password...');
    try {
        const user = await userService.findByPk(id);
        const shortCode = generateShortCode();
        await userService.updateWhere({password: getBcryptedPassword(shortCode)}, {id: user.id});
        await sendTemporaryPasswordMail(user.id, user.email);
        logger.info('Password has been reset');
        return res.status(200).send({message: 'Password has been reset'});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}

export const createUserOrFindIfAuthorized = async (req: Request, res: Response) => {
    logger.info('Verifying if such user already exist...');
    const userToFind = {
        name: req.body.name,
        email: req.body.email
    }
    try {
        const user = await userService.findOneWhere(userToFind);
        if (!user) {
            const createdUser = await createUserAccount(req.body);
            await sendTemporaryPasswordMail(createdUser.id, createdUser.email);
            logger.info('User has been created as new. Heading next...');
        } else {
            logger.info('Such user has been found. Checking authorization...');
            const token = req.headers["x-access-token"];
            const error = verifyToken(token.toString());
            if (error) {
                return res.status(401).send({
                    message: 'Log in and proof your email',
                    code: 401
                });
            }
        }
        logger.info('User authorized or created as new');
        res.status(200).send(user);
    } catch (e) {
        logger.error(e.message + ': Check user credentials.');
        return res.status(400).send({message: e.message + ': Check user credentials.'});
    }
}