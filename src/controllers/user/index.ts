import logger from "../../utils/logger";
import * as userService from "../../services/user";
import * as codeService from "../../services/code";
import {getBcryptedPassword} from "../../services/bcrypt";
import {createUserAccount} from "../../services/account";
import generateShortCode from "../../services/shortCode";
import {sendTemporaryPasswordMail} from "../../services/mail";
import {Request, Response} from "express";

// Find all users
export const findAll = async (req: Request, res: Response) => {
    logger.info('Retrieving all users...');
    try {
        const users = await userService.findAll({excludePassword: true});
        logger.info('Users retrieved!');
        return res.status(200).send(users);
    } catch (e) {
        logger.error("Some error occurred while retrieving users");
        return res.status(500).send({
            message: e.message || "Some error occurred while retrieving users"
        });
    }
};

// Find a user by the id in the request
export const findOne = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info(`Finding user with id=${id}...`);
    try {
        const user = await userService.findByPk(id, {excludePassword: true});
        if (user) {
            logger.info('User found!');
            return res.status(200).send(user);
        } else {
            logger.info(`Cannot find user with id=${id}`);
            return res.status(400).send({
                message: `Cannot find user with id=${id}.`
            });
        }
    } catch (e) {
        logger.info("Error retrieving user with id=" + id + ".");
        return res.status(500).send({
            message: "Error retrieving user with id=" + id + "."
        });
    }
};

// Update a user by the id in the request
export const update = async (req: Request, res: Response) => {
    const id = req.userId || parseInt(req.params.id, 10);
    logger.info(`Updating user with id=${id}...`);
    const userUpdateValues = req.body;
    if (userUpdateValues.password) {
        userUpdateValues.password = getBcryptedPassword(req.body.password);
        userUpdateValues.isPasswordTemporary = false;
    }
    try {
        await userService.updateWhere(userUpdateValues, {id});
        logger.info('User updated, trying to findOne...')
        const user = await userService.findByPk(id, {excludePassword: true});
        logger.info("User was updated successfully!");
        return res.status(200).send(user);
    } catch (e) {
        logger.info("Error updating user with id=" + id);
        logger.info(e.message);
        return res.status(500).send({
            message: "Error updating user with id=" + id
        });
    }
};

// Delete a user by the id in the request
export const deleteByPk = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info(`Deleting user with id=${id}...`);
    try {
        await userService.deleteByPk(id);
        logger.info("User was deleted successfully!");
        return res.status(200).send({id});
    } catch (e) {
        logger.info("Could not delete user with id=" + ".");
        logger.info(e.message);
        return res.status(500).send({
            message: "Could not delete user with id=" + id + "."
        });
    }
};

// Creates user with specified roles, such as 'admin'
export const create = async (req: Request, res: Response) => {
    logger.info('Creating user with specified roles...');
    try {
        logger.info('Creating new user...');
        const createdUser = await createUserAccount({...req.body, isPasswordTemporary: true});
        const shortCode = generateShortCode();
        await codeService.create({verificationCode: shortCode, userId: createdUser.id});
        await sendTemporaryPasswordMail(createdUser.id, createdUser.email);
        logger.info('New user has been created');
        return res.status(200).send(createdUser);
    } catch (e) {
        logger.info('Error in signup');
        return res.status(500).send({message: e.message});
    }
};