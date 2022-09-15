import {Optional} from 'sequelize';

export interface IOrder {
    id: number;
    date: Date;
    time: Date;
    price: number;
    isCompleted: boolean;
    rating: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface OrderInput extends Optional<IOrder, 'id'> {
}

export interface OrderOutput extends Required<IOrder> {
}