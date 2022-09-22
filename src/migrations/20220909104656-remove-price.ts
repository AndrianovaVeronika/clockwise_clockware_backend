'use strict';
import createPriceMigration from "./20220831121623-create-price";
import {QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface,): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await createPriceMigration.down(queryInterface);
        }
    ),
    down: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await createPriceMigration.up(queryInterface);
        }
    )
};
