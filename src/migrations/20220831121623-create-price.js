'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.sequelize.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            yield queryInterface.createTable('Prices', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize_1.DataTypes.INTEGER
                },
                sum: {
                    type: sequelize_1.DataTypes.DOUBLE,
                    allowNull: false
                },
                cityId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    unique: true
                },
                createdAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE
                }
            });
        }));
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.sequelize.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            yield queryInterface.dropTable('Prices');
        }));
    })
};
//# sourceMappingURL=20220831121623-create-price.js.map