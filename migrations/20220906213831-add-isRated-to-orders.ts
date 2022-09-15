'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Orders',
            'rating',
            {
                type: Sequelize.INTEGER
            },
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Orders', 'rating');
    }
};
