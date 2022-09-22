'use strict';

import {QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.renameColumn("Users", "username", "name");
        }
    ),
    down: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.renameColumn("Users", "name", "username");
        }
    )
};
