"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv");
const config = {
    "development": {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect: 'postgres',
    },
    "production": {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};
exports.default = config;
//# sourceMappingURL=db.config.js.map