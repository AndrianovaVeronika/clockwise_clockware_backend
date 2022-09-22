'use strict';

import {QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface) =>
        await queryInterface.sequelize.transaction(async transaction => {
            return queryInterface.bulkInsert('ClockTypes', [
                {
                    id: 1,
                    name: 'small',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 2,
                    name: 'average',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 3,
                    name: 'big',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]);
        }),
    down: async (queryInterface: QueryInterface) =>
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.bulkDelete('ClockTypes', null, {});
        })
}