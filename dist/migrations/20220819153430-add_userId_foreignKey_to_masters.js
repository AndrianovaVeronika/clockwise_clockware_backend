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
            yield queryInterface.addColumn('Masters', 'userId', {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            });
            yield queryInterface.addConstraint('Masters', {
                fields: ['userId'],
                type: 'foreign key',
                name: 'userId',
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade',
            });
        }));
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.sequelize.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            yield queryInterface.removeColumn('Masters', 'userId');
        }));
    })
};
//# sourceMappingURL=20220819153430-add_userId_foreignKey_to_masters.js.map