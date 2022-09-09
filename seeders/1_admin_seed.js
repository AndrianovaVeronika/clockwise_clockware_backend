'use strict';

const {getBcryptedPassword} = require("../services/bcrypt.service");
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {
                name: process.env.INITIAL_ADMIN_USERNAME,
                password: getBcryptedPassword(process.env.INITIAL_ADMIN_PASSWORD),
                email: process.env.INITIAL_ADMIN_EMAIL,
                emailChecked: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('UserRoles', null, {});
    }
};