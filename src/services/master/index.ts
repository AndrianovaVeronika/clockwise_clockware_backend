import {MasterInput, MasterOutput, RawMaster} from "../../models/master/master.interface";
import db from "../../models";
import {Op} from 'sequelize';
import MasterFilters from "./master.filters";
import {OrderInput} from "../../models/order/order.interface";
import {parseIntToTimeString, parseTimeStringToInt} from "../parseTime";

const {Master, City, Order} = db.models;

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

export const findAll = async (filters?: MasterFilters): Promise<{ total: number; data: MasterOutput[] }> => {
    const limit = filters?.limit || 100;
    const data = await Master.findAndCountAll({
        ...filters,
        include: [City],
        where: {
            ...filters?.where,
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
            ...(filters?.ratingRange && {
                rating: {
                    [Op.between]: filters.ratingRange
                }
            }),
        },
        limit: limit,
        ...(filters?.page && {offset: filters.page * limit}),
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
    return {total: data.count, data: data.rows.map(masterMapper)};
};

export const findByPk = async (id: number): Promise<MasterOutput> => {
    const master = await Master.findByPk(id, {
        include: [City]
    });
    return masterMapper(master);
};

export const findOneWhere = async (where: Partial<MasterInput>): Promise<MasterOutput> => {
    const master = await Master.findOne({where, include: [City]});
    return masterMapper(master);
};

export const create = async (payload: MasterInput, filters?: MasterFilters): Promise<MasterOutput> => {
    const master = await Master.create(payload);
    const cities = await City.findAll({
        where: {
            name: {
                [Op.or]: payload.cities
            }
        }
    });
    await master.setCities(cities);
    const masterWithCities = await Master.findByPk(master.id, {
        include: [City]
    });
    return masterMapper(masterWithCities);
};

export const updateByPk = async (id: number, payload: Partial<MasterInput>): Promise<MasterOutput> => {
    const master = await Master.findByPk(id);
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

export const findAvailable = async (newOrder: Partial<OrderInput>, filters?: MasterFilters): Promise<{ total: number; data: any }> => {
    const newOrderTime = parseTimeStringToInt(newOrder.time);
    console.log(newOrder)
    console.log(typeof newOrder.clockTypeId)
    console.log(filters)
    const interrogatingOrders = await Order.findAll({
        attributes: ['masterId'],
        where: {
            date: newOrder.date,
            [Op.or]: [
                {
                    time: {
                        [Op.between]: [parseIntToTimeString(newOrderTime - 1),
                            parseIntToTimeString(newOrderTime + newOrder.clockTypeId)]
                    }
                },
                {
                    time: parseIntToTimeString(newOrderTime - 2),
                    clockTypeId: {[Op.or]: [2, 3]}
                },
                {
                    time: parseIntToTimeString(newOrderTime - 3),
                    clockTypeId: 3
                }
            ]
        }
    });
    console.log('interogating orders are ok')
    const interrogatingOrdersMastersId = interrogatingOrders.map(order => order.masterId);
    const availableMasters = await Master.findAndCountAll({
        ...filters,
        include: {
            model: City, /*through: {attributes: ['name']}*/ where: {
                id: newOrder.cityId
            }
        },
        where: {
            id: {
                [Op.notIn]: interrogatingOrdersMastersId
            }
        }
    });
    return {total: availableMasters.count, data: availableMasters.rows.map(masterMapper)};
};