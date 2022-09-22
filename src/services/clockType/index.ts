import db from "../../models";
import {ClockTypeOutput} from "../../models/clocktype/clocktype.interface";

const ClockType = db.models.ClockType;

export const findAll = async (): Promise<ClockTypeOutput[]> => {
    return await ClockType.findAll();
};