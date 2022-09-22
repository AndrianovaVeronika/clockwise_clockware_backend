'use strict';

import {DataTypes, QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.addColumn('Masters',
                'userId',
                {
                    type: DataTypes.INTEGER,
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
            })
        }
    ),
    down: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.removeColumn('Masters', 'userId')
        }
    )
};
