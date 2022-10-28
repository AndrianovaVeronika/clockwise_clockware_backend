import db from "../../models";
import {ClockTypeOutput} from "../../models/clocktype/clocktype.interface";

const ClockType = db.models.ClockType;

export const findAll = (): Promise<ClockTypeOutput[]> => {
    return ClockType.findAll();
};

export const findByPk = (id: number): Promise<ClockTypeOutput> => {
    return ClockType.findByPk(id);
};