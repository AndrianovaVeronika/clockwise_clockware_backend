'use strict';
import {DataTypes, QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.createTable('ClockTypes', {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: DataTypes.INTEGER
                },
                name: {
                    type: DataTypes.STRING
                },
                createdAt: {
                    allowNull: false,
                    type: DataTypes.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: DataTypes.DATE
                }
            })
        }
    ),
    down: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.dropTable('ClockTypes');
        }
    )
};