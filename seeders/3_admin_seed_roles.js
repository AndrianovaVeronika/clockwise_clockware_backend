'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
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
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('UserRoles', null, {});
    }
};