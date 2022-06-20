'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
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
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Roles', null, {});
    }
};