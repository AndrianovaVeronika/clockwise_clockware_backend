import {Optional} from 'sequelize';

export interface IRole {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface RoleInput extends Optional<IRole, 'id'> {
}

export interface RoleOutput extends Required<IRole> {
}