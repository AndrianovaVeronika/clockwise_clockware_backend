import "dotenv";

const config = {
    development: {
        host: process.env.DB_HOST as string,
        username: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
        dialect: 'postgres'
    },
    production: {
        host: process.env.DB_HOST as string,
        username: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};

export default config;