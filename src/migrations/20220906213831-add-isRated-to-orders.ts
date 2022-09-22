'use strict';

import {DataTypes, QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.addColumn('Orders',
                'rating',
                {
                    type: DataTypes.INTEGER
                },
            );
        }
    ),
    down: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.removeColumn('Orders', 'rating');
        }
    )
};
