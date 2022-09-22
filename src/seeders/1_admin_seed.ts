'use strict';
import {getBcryptedPassword} from "../services/bcrypt";
import {QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface) =>
        await queryInterface.sequelize.transaction(async transaction => {
            return await queryInterface.bulkInsert('Users', [
                {
                    name: process.env.INITIAL_ADMIN_USERNAME,
                    password: getBcryptedPassword(process.env.INITIAL_ADMIN_PASSWORD),
                    email: process.env.INITIAL_ADMIN_EMAIL,
                    emailChecked: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]);
        }),
    down: async (queryInterface: QueryInterface) =>
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.bulkDelete('UserRoles', null, {});
        })
};