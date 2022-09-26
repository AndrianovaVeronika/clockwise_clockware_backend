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
            yield queryInterface.addColumn('Cities', 'price', {
                type: sequelize_1.DataTypes.DOUBLE
            });
        }));
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.sequelize.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            yield queryInterface.removeColumn('Cities', 'price');
        }));
    })
};
//# sourceMappingURL=20220904163332-add-price-to-cities.js.map