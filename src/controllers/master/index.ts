import {Request, Response} from 'express';
import logger from "../../utils/logger";
import * as accountService from "../../services/account";
import * as masterService from "../../services/master";
import {sendTemporaryPasswordMail} from "../../services/mail";
import MasterFilters from "../../services/master/master.filters";
import db from "../../models";

const Op = db.Sequelize.Op;

// Creates master with account from admin perspective
export const create = async (req: Request, res: Response) => {
    logger.info('Creating new master...');
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isPasswordTemporary: true
        };
        const newMaster = {
            name: req.body.name,
            rating: req.body.rating,
            cities: req.body.cities
        };
        const createdAccount = await accountService.createMasterAccount(newUser, newMaster);
        await sendTemporaryPasswordMail(createdAccount.user.id, createdAccount.user.email);
        logger.info('New master has been created');
        return res.status(201).send(createdAccount);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Retrieve all from the database.
export const findAll = async (req: Request, res: Response) => {
    logger.info('Retrieving all masters...');
    try {
        const filters: MasterFilters = req.query;
        const masters = await masterService.findAll(filters);
        logger.info('Masters retrieved!');
        return res.status(200).send(masters);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Find a single master with an id
export const findByPk = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info(`Finding master with id=${id}...`);
    try {
        const master = await masterService.findByPk(id);
        if (!master) {
            logger.error(`Cannot find master with id=${id}`);
            return res.status(400).send({
                message: `Cannot find master with id=${id}.`
            });
        }
        logger.info('Master has been found!');
        return res.status(200).send(master);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Update a Tutorial by the id in the request
export const update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info(`Updating master with id=${id}...`);
    try {
        const master = await masterService.updateWhere({id}, req.body);
        logger.info("Master was updated successfully!");
        return res.status(200).send(master);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Delete a master with the specified id in the request
export const deleteByPk = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info(`Deleting master with id=${id}...`);
    try {
        await masterService.deleteByPk(id);
        logger.info("Master was deleted successfully!");
        return res.status(200).send({id});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}

// Return available masters
export const findAllMastersAvailable = async (req: Request, res: Response) => {
    logger.info('Filtering all available masters...');
    try {
        const {newOrder, filters}: {
            newOrder?: {
                cityId: string;
                clockTypeId: string;
                date: string;
                time: string;
            }, filters?: MasterFilters
        } = req.query;
        const orderToPlace = {
            cityId: parseInt(newOrder.cityId),
            clockTypeId: parseInt(newOrder.clockTypeId),
            date: newOrder.date,
            time: newOrder.time
        }
        const masters = await masterService.findAvailable(orderToPlace, filters);
        logger.info('All available masters have been retrieved!');
        return res.status(200).send(masters);
    } catch
        (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}