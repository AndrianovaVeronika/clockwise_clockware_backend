import {Optional} from 'sequelize';

export interface ICode {
    id: number;
    verificationCode: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CodeInput extends Optional<ICode, 'id'> {
}

export interface CodeOutput extends Required<ICode> {
}