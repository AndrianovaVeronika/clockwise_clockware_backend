import {Optional} from 'sequelize';

export interface ICity {
    id: number;
    name: string;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface CityInput extends Optional<ICity, 'id'> {
}

export interface CityOutput extends Required<ICity> {
    masters?: string[]
}