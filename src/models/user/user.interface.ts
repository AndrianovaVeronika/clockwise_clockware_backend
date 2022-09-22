import {Optional} from 'sequelize';

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    emailChecked?: boolean;
    isPasswordTemporary?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserInput extends Optional<IUser, 'id'> {
    roles?: string[]
}

export interface UserOutput extends Required<IUser> {
    roles?: string[]
}