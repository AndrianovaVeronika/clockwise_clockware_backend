'use strict';
const createPriceMigration = require("./20220831121623-create-price");

module.exports = {
    async up(queryInterface, Sequelize) {
        await createPriceMigration.down();
    },

    async down(queryInterface, Sequelize) {
        await createPriceMigration.up();
    }
};
