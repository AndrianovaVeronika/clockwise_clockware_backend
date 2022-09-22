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
exports.default = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        return yield queryInterface.sequelize.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            return queryInterface.bulkInsert('Roles', [
                {
                    id: 1,
                    name: 'user',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 2,
                    name: 'admin',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 3,
                    name: 'master',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]);
        }));
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        return yield queryInterface.sequelize.transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('Roles', null, {});
        }));
    })
};
//# sourceMappingURL=2_roles_seeds.js.map