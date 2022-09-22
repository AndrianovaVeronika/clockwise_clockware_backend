'use strict';

import {DataTypes, QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.addColumn('Cities',
                'price',
                {
                    type: DataTypes.DOUBLE
                },
            );
        }
    ),

    down: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.removeColumn('Cities', 'price');
        }
    )
};
