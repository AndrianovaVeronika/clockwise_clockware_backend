import {CityInput, CityOutput} from "../../models/city/city.interface";
import db from "../../models";
import CityFilters from "./city.filters";

const City = db.models.City;
const Op = db.Sequelize.Op;

export const findAll = (filters?: CityFilters): Promise<CityOutput[]> => {
    return City.findAll({
        where: {
            ...filters?.where,
            ...(filters?.priceRange && {
                price: {
                    [Op.between]: filters.priceRange
                }
            })
        }
        // where: {
        //     ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        // },
        // ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
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