import db from "../../models";
import {ClockTypeOutput} from "../../models/clocktype/clocktype.interface";

const ClockType = db.models.ClockType;

export const findAll = (): Promise<ClockTypeOutput[]> => {
    return ClockType.findAll();
};