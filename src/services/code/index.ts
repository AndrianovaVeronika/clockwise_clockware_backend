import db from "../../models";
import {CodeInput, CodeOutput} from "../../models/code/code.interface";

const Code = db.models.Code;

export const create = (payload: CodeInput): Promise<CodeOutput> => {
    return Code.create(payload);
};

export const findOneWhere = (where: Partial<CodeInput>): Promise<CodeOutput> => {
    return Code.findOne({where});
};