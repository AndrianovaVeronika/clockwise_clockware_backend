import {Optional} from 'sequelize';

export interface IMaster {
    id: number;
    name: string;
    rating: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface MasterInput extends Optional<IMaster, 'id'> {
}

export interface MasterOutput extends Required<IMaster> {
}