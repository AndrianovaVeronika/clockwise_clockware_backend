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
            yield queryInterface.createTable('Masters', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize_1.DataTypes.INTEGER
                },
                name: {
                    type: sequelize_1.DataTypes.STRING
                },
                rating: {
                    type: sequelize_1.DataTypes.INTEGER
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
            yield queryInterface.dropTable('Masters');
        }));
    })
};
//# sourceMappingURL=20220418111907-create-master.js.map