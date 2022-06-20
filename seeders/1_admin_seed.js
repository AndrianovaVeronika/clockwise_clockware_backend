'use strict';

const {getBcryptedPassword} = require("../services/bcrypt.service");
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {
                "username": process.env.INITIAL_ADMIN_USERNAME,
                "password": getBcryptedPassword(process.env.INITIAL_ADMIN_PASSWORD),
                "email": process.env.INITIAL_ADMIN_EMAIL,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('UserRoles', null, {});
    }
};