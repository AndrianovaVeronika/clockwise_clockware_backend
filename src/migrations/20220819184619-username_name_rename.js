'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.renameColumn("Users", "username", "name");
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.renameColumn("Users", "name", "username");
    }
};
