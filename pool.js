const { Client, Pool } = require('pg');

require('dotenv').config();
const logger = require('./utils/logger');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

// const pool = new Client({
//     connectionString: process.env.DB_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });
//
// pool.connect();

// pool.query('CREATE TABLE IF NOT EXISTS cities (id integer NOT NULL PRIMARY KEY,name varchar NOT NULL)', (error, result) => {
//     if (error) {
//         logger.info('ERROR', error);
//     }
//     logger.info('RESULT', result);
// })

module.exports = {pool};