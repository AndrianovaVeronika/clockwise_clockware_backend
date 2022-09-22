import * as userService from "../user";
import * as masterService from "../master";
import db from "../../models";
import {MasterInput} from "../../models/master/master.interface";
import {UserInput} from "../../models/user/user.interface";

const createAccount = async (userData: UserInput, roles: string[]) => {
    const userRoles = [];
    for (const rolesKey in db.ROLES) {
        if (roles.includes(db.ROLES[rolesKey as unknown as keyof typeof db.ROLES])) {
            userRoles.push(rolesKey);
        }
    }
    const user = await userService.create(userData);
    return await userService.findByPk(user.id, {excludePassword: true});
};

export const createUserAccount = async (userData: UserInput) => {
    return await createAccount(userData, ['user']);
};

export const createMasterAccount = async (userData: UserInput, masterData: MasterInput) => {
    const user = await createAccount(userData, ['user', 'master']);
    const master = await masterService.create(masterData);
    return {user, master};
};

// export const createAdminAccount = async (name, email, password) => {
//     await createAccount(name, email, password, ['admin']);
// };