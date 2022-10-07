import {Optional} from 'sequelize';

export interface IClockType {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    // deletedAt?: Date;
}

export interface ClockTypeInput extends Optional<IClockType, 'id'> {
}

export interface ClockTypeOutput extends Required<IClockType> {
}