'use strict';
import {DataTypes, QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.createTable('Masters', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER
                },
                name: {
                    type: DataTypes.STRING
                },
                rating: {
                    type: DataTypes.INTEGER
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
            await queryInterface.dropTable('Masters');
        }
    )
};