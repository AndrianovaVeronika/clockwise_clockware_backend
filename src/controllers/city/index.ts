import {Request, Response} from 'express';
import logger from "../../utils/logger";
import * as cityService from "../../services/city";

// Retrieve all cities from the database
export const findAll = async (req: Request, res: Response) => {
    logger.info("Retrieving all cities...");
    try {
        const cities = await cityService.findAll(req.query);
        logger.info("Cities retrieved!");
        return res.status(200).send(cities);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Find a city with an id
export const findByPk = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info(`Finding city with id=${id}...`);
    try {
        const city = await cityService.findByPk(id);
        if (!city) {
            logger.error(`Cannot find City with id=${id}.`);
            return res.status(400).send({
                message: `Cannot find City with id=${id}.`
            });
        }
        logger.info("City has been found!");
        return res.status(200).send(city);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

export const create = async (req: Request, res: Response) => {
    logger.info("Creating city...");
    const newCity = {
        name: req.body.name,
        price: req.body.price
    };
    try {
        const city = await cityService.create(newCity);
        logger.info("City created!");
        return res.status(201).send(city);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Update a city by the id in the request
export const update = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info(`Updating city with id=${id}...`);
    const valuesToUpdate = {
        name: req.body.name,
        price: req.body.price
    };
    try {
        const createdCity = await cityService.updateByPk(id, valuesToUpdate);
        logger.info("Index has been updated successfully.");
        return res.status(200).send(createdCity);
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};

// Delete a city with the specified id in the request
export const deleteByPk = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    logger.info(`Deleting city with id=${id}...`);
    try {
        await cityService.deleteByPk(id);
        logger.info("City has been deleted successfully.");
        return res.status(200).send({id});
    } catch (e) {
        logger.error(e.message);
        return res.status(500).send({message: e.message});
    }
};