import {Optional} from 'sequelize';
import User from "../user";
import ClockType from "../clocktype";
import Master from "../master";
import City from "../city";

export interface IOrder {
    id: number;
    date: string;
    time: string;
    price: number;
    isCompleted?: boolean;
    rating?: number;
    createdAt?: Date;
    updatedAt?: Date;
    // deletedAt?: Date;
}

export interface OrderInput extends Optional<IOrder, 'id'> {
    date: string;
    name: string;
    email: number;
    userId?: number;
    masterId: number;
    cityId: number;
    clockTypeId: number;
}

export interface OrderOutput extends Required<IOrder> {
    name: string;
    email: string;
    master: string;
    city: string;
    clockType: string;
    userId?: number;
    masterId?: number;
    cityId?: number;
    clockTypeId?: number;
}

export interface RawOrder extends IOrder {
    User?: User,
    ClockType?: ClockType,
    Master?: Master,
    City?: City,
    userId?: number;
    masterId?: number;
    cityId?: number;
    clockTypeId?: number;
}

export interface OrderMailData{
    id: number;
    date: string;
    time: string;
    price: number;
    name: string;
    email: string;
    master: string;
    city: string;
    clockType: string;
}