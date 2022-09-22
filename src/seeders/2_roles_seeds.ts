'use strict';

import {QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface) =>
        await queryInterface.sequelize.transaction(async transaction => {
            return queryInterface.bulkInsert('Roles', [
                {
                    id: 1,
                    name: 'user',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 2,
                    name: 'admin',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 3,
                    name: 'master',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]);
        }),
    down: async (queryInterface: QueryInterface) =>
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.bulkDelete('Roles', null, {});
        })
};