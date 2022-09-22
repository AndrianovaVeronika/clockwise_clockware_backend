'use strict';

import {DataTypes, QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.addColumn('Users',
                'isPasswordTemporary',
                {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
            )
        }
    ),
    down: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.removeColumn('Users', 'isPasswordTemporary')
        }
    )
};
