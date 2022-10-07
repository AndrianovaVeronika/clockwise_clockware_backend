'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Orders',
            'price',
            {
                type: Sequelize.DOUBLE
            },
        );
        await queryInterface.addColumn('Orders',
            'isCompleted',
            {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Orders', 'price');
        await queryInterface.removeColumn('Orders', 'isCompleted');
    }
};
