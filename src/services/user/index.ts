import db from "../../models";
import {UserInput, UserOutput, UserRaw} from "../../models/user/user.interface";
import UserFilters from "./user.filters";
import {getBcryptedPassword} from "../bcrypt";
import {Op} from "sequelize";
import defaultRowsNumberLimit from "../../constants/defaultRowsNumberLimit";

const {User, Role} = db.models;

const userMapper = (user: UserRaw): UserOutput => user ? {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    emailChecked: user.emailChecked,
    isPasswordTemporary: user.isPasswordTemporary,
    roles: user.Roles.map(role => role.name),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    // deletedAt: user.deletedAt
} : undefined;

export const findAll = async (filters?: UserFilters): Promise<{ total: number; data: UserOutput[]; }> => {
    const limit = filters?.limit || defaultRowsNumberLimit;
    const data = await User.findAndCountAll({
        ...filters,
        where: {
            ...filters?.where,
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}}),
        },
        include: [Role],
        limit: limit,
        ...(filters?.page && {offset: filters.page * limit}),
        ...(filters?.excludePassword && {attributes: {exclude: ['password']}}),
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
    return {total: data.count, data: data.rows.map(userMapper)};
};

export const findByPk = async (id: number, filters?: UserFilters): Promise<UserOutput> => {
    const user: UserRaw = await User.findByPk(id, {
        ...(filters?.excludePassword && {attributes: {exclude: ['password']}}),
        include: [Role]
    });
    return userMapper(user);
};

export const findOneWhere = async (where: Partial<UserInput>, filters?: UserFilters): Promise<UserOutput> => {
    const user = await User.findOne({
        where,
        include: [Role]
    });
    return userMapper(user);
};

export const create = async (payload: UserInput, filters?: UserFilters): Promise<UserOutput> => {
    const user = await User.create({
        ...payload,
        ...(payload.password && {password: getBcryptedPassword(payload.password)})
    });
    const Roles = await Role.findAll({
        where: {
            name: {
                [Op.or]: payload.roles
            }
        }
    });
    await user.setRoles(Roles);
    const createdUser = await User.findByPk(user.id, {
        ...(filters?.excludePassword && {attributes: {exclude: ['password']}}),
        include: [Role]
    });
    return userMapper(createdUser);
};

export const updateByPk = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findByPk(id, {
        include: [Role]
    });
    return userMapper(await user.update(payload));
};

export const updateWhere = async (payload: Partial<UserInput>, where?: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findOne({
        where,
        include: [Role]
    });
    return userMapper(await user.update(payload));
};

export const deleteByPk = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: {id}
    });
    return !!deletedUserCount;
};