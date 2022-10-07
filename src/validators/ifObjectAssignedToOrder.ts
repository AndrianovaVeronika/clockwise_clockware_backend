import logger from "../utils/logger";
import * as orderService from "../services/order";
import {NextFunction, Request, Response} from 'express';

const getOrderDependingOnModelId = async (model: string, id: number) => {
    return await orderService.findOneWhere({[model + 'Id']: id});
};

const getModelValidator = (model: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.params.id, 10);
        logger.info('Checking if ' + model + ' with id=' + id + ' can be deleted...');
        if (await getOrderDependingOnModelId(model, id)) {
            logger.error(model[0].toUpperCase() + model.slice(1) + " is assigned to order. Delete can`t be complete");
            return res.status(400).send({
                message: model[0].toUpperCase() + model.slice(1) + " is assigned to order. Delete can`t be complete"
            });
        }
        next();
    };
};

export default {
    city: getModelValidator('city'),
    master: getModelValidator('master'),
    user: getModelValidator('user')
};