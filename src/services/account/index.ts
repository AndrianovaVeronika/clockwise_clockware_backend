import * as userService from "../user";
import * as masterService from "../master";
import {MasterInput} from "../../models/master/master.interface";
import {UserInput} from "../../models/user/user.interface";
import logger from "../../utils/logger";

const createAccount = async (userData: UserInput, roles: string[]) => {
    return await userService.create({...userData, roles}, {excludePassword: true});
};

export const createUserAccount = async (userData: UserInput) => {
    return await createAccount(userData, ['user']);
};

export const createMasterAccount = async (userData: UserInput, masterData: MasterInput) => {
    const user = await createAccount(userData, ['user', 'master']);
    const master = await masterService.create({...masterData, userId: user.id});
    return {user, master};
};

// export const createAdminAccount = async (name, email, password) => {
//     await createAccount(name, email, password, ['admin']);
// };