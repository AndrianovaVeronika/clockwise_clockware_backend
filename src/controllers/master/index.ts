import {Request, Response} from 'express';
import logger from "../../utils/logger";
import moment from "moment";
import * as accountService from "../../services/account";
import * as masterService from "../../services/master";
import * as cityService from "../../services/city";
import * as orderService from "../../services/order";
import {sendTemporaryPasswordMail} from "../../services/mail";
import {parseTimeStringToInt} from "../../services/parseTime";
import MasterFilters from "../../services/master/master.filters";

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
        const newOrder = {
            date: req.body.date,
            time: req.body.time,
            cityId: req.body.cityId,
            clockTypeId: req.body.clockTypeId
        };
        const incomeMasters = await masterService.findAll();
        const city = await cityService.findByPk(newOrder.cityId);
        const masters = incomeMasters.data.filter(master => master.cities.includes(city.name));
        const orders = await orderService.findAll();

        const ifOrdersInterrogates = (
            newOrderStartTime: string,
            newOrderRepairingTime: number,
            existingOrderStartTime: string,
            existingOrderRepairingTime: number
        ) => {
            const existingOrderStartTimeInNum = parseTimeStringToInt(existingOrderStartTime);
            const newOrderStartTimeInNum = parseTimeStringToInt(newOrderStartTime);
            if (newOrderStartTimeInNum < existingOrderStartTimeInNum) {
                if ((newOrderStartTimeInNum + newOrderRepairingTime) < existingOrderStartTimeInNum) {
                    return false;
                }
            } else {
                if (existingOrderStartTimeInNum + existingOrderRepairingTime < newOrderStartTimeInNum) {
                    return false;
                }
            }
            return true;
        }
        const getRepairingHours = (type: string) => {
            switch (type) {
                case 'small':
                    return 1;
                case 'average':
                    return 2;
                case 'big':
                    return 3;
                default:
                    return 0;
            }
        }

        logger.info('Starting retrieving busy masters...')
        const busyMasters: string[] = [];
        for (const order of orders.data) {
            if (moment(newOrder.date).format('MM-DD-YYYY') !== moment(order.date).format('MM-DD-YYYY')) {
                continue;
            }

            // if chosen time interrogates with existing order time add master to busy masters list
            if (ifOrdersInterrogates(newOrder.time, newOrder.clockTypeId, order.time, getRepairingHours(order.clockType))) {
                busyMasters.push(order.master);
            }
        }
        const availableMasters = masters.filter((master) => !busyMasters.includes(master.name));
        logger.info('All available masters have been retrieved!');
        return res.status(200).send(availableMasters);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
}