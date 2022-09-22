'use strict';
import {DataTypes, QueryInterface} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async transaction => {
            await queryInterface.createTable('Codes', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER
                },
                verificationCode: {
                    type: DataTypes.STRING,
                    unique: true
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
            await queryInterface.dropTable('Codes');
        }
    )
};