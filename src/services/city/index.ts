import {CityInput, CityOutput} from "../../models/city/city.interface";
import db from "../../models";
import {Op} from 'sequelize';
import CityFilters from "./city.filters";

const City = db.models.City;

export const findAll = async (filters?: CityFilters): Promise<CityOutput[]> => {
    return await City.findAll({
        // where: {
        //     ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        // },
        // ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
};

export const findByPk = async (id: number): Promise<CityOutput> => {
    const city = await City.findByPk(id);
    return city;
};

export const create = async (payload: CityInput): Promise<CityOutput> => {
    return await City.create(payload);
};

export const updateByPk = async (id: number, payload: Partial<CityInput>): Promise<CityOutput> => {
    const city = await City.findByPk(id);
    return await city.update(payload);
};

export const deleteByPk = async (id: number): Promise<boolean> => {
    const deletedCityCount = await City.destroy({
        where: {id}
    });
    return !!deletedCityCount;
};