import {CityInput, CityOutput} from "../../models/city/city.interface";
import db from "../../models";
import CityFilters from "./city.filters";
import defaultRowsNumberLimit from "../../constants/defaultRowsNumberLimit";

const City = db.models.City;
const Op = db.Sequelize.Op;

export const findAll = async (filters?: CityFilters): Promise<{ total: number; data: CityOutput[] }> => {
    const limit = filters?.limit || defaultRowsNumberLimit;
    const data = await City.findAndCountAll({
        ...filters,
        where: {
            ...filters?.where,
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
            ...(filters?.priceRange && {
                price: {
                    [Op.between]: filters.priceRange
                }
            })
        },
        limit: limit,
        ...(filters?.page && {offset: filters.page * limit}),
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
    return {total: data.count, data: data.rows};
};

export const findByPk = (id: number): Promise<CityOutput> => {
    return City.findByPk(id);
};

export const create = (payload: CityInput): Promise<CityOutput> => {
    return City.create(payload);
};

export const updateByPk = async (id: number, payload: Partial<CityInput>): Promise<CityOutput> => {
    const city = await City.findByPk(id);
    return city.update(payload);
};

export const deleteByPk = async (id: number): Promise<boolean> => {
    const deletedCityCount = await City.destroy({
        where: {id}
    });
    return !!deletedCityCount;
};