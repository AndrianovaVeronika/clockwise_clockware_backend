import {Dialect} from "sequelize";

const dbConfig = {
    "development": {
        host: process.env.DB_HOST as string,
        username: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
        dialect: 'postgres' as Dialect,
    },
    "production": {
        host: process.env.DB_HOST as string,
        username: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
        dialect: 'postgres' as Dialect,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};

export default dbConfig;