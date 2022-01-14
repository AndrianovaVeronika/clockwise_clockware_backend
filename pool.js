const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clockwise_clockware',
    password: 'D@t@b@s32003',
    port: 5432,
})

module.exports = {pool};