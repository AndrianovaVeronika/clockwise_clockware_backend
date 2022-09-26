import db from "../../models";
import {Op} from 'sequelize';
import {UserInput, UserOutput} from "../../models/user/user.interface";
import UserFilters from "./user.filters";

const {User, Role} = db.models;

const userMapper = (user: UserInput): UserOutput => ({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    emailChecked: user.emailChecked,
    isPasswordTemporary: user.isPasswordTemporary,
    roles: user.roles,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    // deletedAt: user.deletedAt
});

export const findAll = async (filters?: UserFilters): Promise<UserOutput[]> => {
    const users = await User.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        include: [{
            model: Role,
            as: 'roles'
        }],
        ...(filters?.excludePassword && {attributes: {exclude: ['password']}}),
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    });
    return users.map(userMapper);
};

export const findByPk = async (id: number, filters?: UserFilters): Promise<UserOutput> => {
    const user = await User.findByPk(id, {
        ...(filters?.excludePassword && {attributes: {exclude: ['password']}}),
    });
    const roles = await user.getRoles();
    if (!user) {
        throw new Error(`Cannot find user with id=${id}.`);
    }
    return userMapper(user);
};

export const findOneWhere = async (where: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findOne({
        where
    });
    if (!user) {
        throw new Error(`Cannot find user.`);
    }
    return userMapper(user);
};

export const create = async (payload: UserInput): Promise<UserOutput> => {
    const user = await User.create(payload);
    if (payload.roles) {
        await user.setRoles(payload.roles);
    }
    return userMapper(user);
};

export const updateByPk = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error(`Cannot find user with id=${id}.`);
    }
    return userMapper(await user.update(payload));
};

export const updateWhere = async (payload: Partial<UserInput>, where?: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findOne({where});
    if (!user) {
        throw new Error(`Cannot find user.`);
    }
    return userMapper(await user.update(payload));
};

export const deleteByPk = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: {id}
    });
    return !!deletedUserCount;
};