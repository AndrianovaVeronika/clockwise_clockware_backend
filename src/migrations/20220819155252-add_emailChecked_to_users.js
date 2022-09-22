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
            yield queryInterface.addColumn('Users', 'emailChecked', {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false
            });
        }));
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.sequelize.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            yield queryInterface.removeColumn('Users', 'emailChecked');
        }));
    })
};
//# sourceMappingURL=20220819155252-add_emailChecked_to_users.js.map