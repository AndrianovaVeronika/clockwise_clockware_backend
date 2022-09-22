'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../connections/db.connection"));
const city_1 = __importDefault(require("./city"));
const clocktype_1 = __importDefault(require("./clocktype"));
const code_1 = __importDefault(require("./code"));
const master_1 = __importDefault(require("./master"));
const order_1 = __importDefault(require("./order"));
const role_1 = __importDefault(require("./role"));
const user_1 = __importDefault(require("./user"));
const db = {
    models: {
        City: city_1.default,
        ClockType: clocktype_1.default,
        Master: master_1.default,
        Order: order_1.default,
        Role: role_1.default,
        User: user_1.default,
        Code: code_1.default
    },
    ROLES: { 1: "user", 2: "admin", 3: "master" },
    sequelize: db_connection_1.default,
    Sequelize: sequelize_1.Sequelize
};
exports.default = db;
//# sourceMappingURL=index.js.map