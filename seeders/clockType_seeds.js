'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
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
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ClockTypes', null, {});
    }
}