'use strict';

import {QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface) =>
        await queryInterface.sequelize.transaction(async transaction => {
            return queryInterface.bulkInsert('UserRoles', [
                {
                    RoleId: 1,
                    UserId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    RoleId: 2,
                    UserId: 1,
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