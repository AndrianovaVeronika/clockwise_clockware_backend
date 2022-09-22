'use strict';

import {DataTypes, QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.addColumn('Orders',
                'price',
                {
                    type: DataTypes.DOUBLE
                },
            );
            await queryInterface.addColumn('Orders',
                'isCompleted',
                {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
            );
        }
    ),
    down: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.removeColumn('Orders', 'price');
            await queryInterface.removeColumn('Orders', 'isCompleted');
        }
    )
};
