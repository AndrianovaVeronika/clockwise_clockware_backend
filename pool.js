const Pool = require('pg').Pool
require('dotenv').config();
const logger = require('./utils/logger');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

// pool.query('CREATE TABLE IF NOT EXISTS cities (id integer NOT NULL PRIMARY KEY,name varchar NOT NULL)', (error, result) => {
//     if (error) {
//         logger.info('ERROR', error);
//     }
//     logger.info('RESULT', result);
// })

module.exports = {pool};