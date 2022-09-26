import {Optional} from 'sequelize';
import City from "../city";

export interface IMaster {
    id: number;
    name: string;
    rating?: number;
    createdAt?: Date;
    updatedAt?: Date;
    // deletedAt?: Date;
}

export interface MasterInput extends Optional<IMaster, 'id'> {
    cities?: string[],
    userId?: number
}

export interface MasterOutput extends Required<IMaster> {
    cities?: string[]
    userId: number
}

export interface RawMaster extends IMaster{
    Cities?: City[],
    userId?: number
}