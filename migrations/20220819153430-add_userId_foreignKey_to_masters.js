'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Masters',
            'userId',
            {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        )
        await queryInterface.addConstraint('Masters', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'userId', // optional
            references: {
                table: 'Users',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Masters', 'userId')
    }
};
