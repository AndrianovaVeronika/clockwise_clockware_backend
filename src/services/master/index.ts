import {MasterInput, MasterOutput, RawMaster} from "../../models/master/master.interface";
import db from "../../models";
import {Op} from 'sequelize';
import MasterFilters from "./master.filters";

const {Master, City} = db.models;

const masterMapper = (master: RawMaster): MasterOutput => ({
    id: master.id,
    name: master.name,
    rating: master.rating,
    cities: master.Cities.map((city) => city.name),
    userId: master.userId,
    createdAt: master.createdAt,
    updatedAt: master.updatedAt,
    // deletedAt: master.deletedAt
});

export const findAll = async (filters?: MasterFilters): Promise<MasterOutput[]> => {
    const masters = await Master.findAll({
        include: [City],
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
    return masters.map(masterMapper);
};

export const findByPk = async (id: number): Promise<MasterOutput> => {
    const master = await Master.findByPk(id, {
        include: [City]
    });
    if (!master) {
        throw new Error(`Cannot find city with id=${id}.`);
    }
    return masterMapper(master);
};

export const findOneWhere = async (where: Partial<MasterInput>): Promise<MasterOutput> => {
    const master = await Master.findOne({where});
    if (!master) {
        throw new Error(`Cannot find city.`);
    }
    return masterMapper(master);
};

export const create = async (payload: MasterInput): Promise<MasterOutput> => {
    const master = await Master.create(payload);
    const cities = await City.findAll({
        where: {
            name: {
                [Op.or]: payload.cities
            }
        }
    });
    await master.setCities(cities);
    const masterWithCities = await Master.findByPk(master.id);
    return masterMapper(masterWithCities);
};

export const updateByPk = async (id: number, payload: Partial<MasterInput>): Promise<MasterOutput> => {
    const master = await Master.findByPk(id);
    if (!master) {
        throw new Error(`Cannot find city with id=${id}.`);
    }
    await Master.update(payload, {where: {id}});
    if (payload.cities) {
        const cities = await City.findAll({
            where: {
                name: {
                    [Op.or]: payload.cities
                }
            }
        })
        await master.setCities(cities);
    }
    const updatedMaster = await Master.findByPk(master.id, {include: [City]});
    return masterMapper(updatedMaster);
};

export const updateWhere = async (where: Partial<MasterInput>, payload: Partial<MasterInput>): Promise<MasterOutput> => {
    const master = await Master.findOne({where});
    if (!master) {
        throw new Error(`Cannot find city.`);
    }
    const updatedMaster = await master.update(payload)
    if (payload.cities) {
        const cities = await City.findAll({
            where: {
                name: {
                    [Op.or]: payload.cities
                }
            }
        })
        await master.setCities(cities);
    }
    return masterMapper({...updatedMaster, Cities: await master.getCities()});
};

export const deleteByPk = async (id: number): Promise<boolean> => {
    const deletedMasterCount = await Master.destroy({
        where: {id}
    });
    return !!deletedMasterCount;
};