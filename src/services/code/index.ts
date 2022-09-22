import db from "../../models";
import {CodeInput, CodeOutput} from "../../models/code/code.interface";

const Code = db.models.Code;

export const create = async (payload: CodeInput): Promise<CodeOutput> => {
    return await Code.create(payload);
};

export const findOneWhere = async (where: Partial<CodeInput>): Promise<CodeOutput> => {
    return await Code.findOne({where});
};