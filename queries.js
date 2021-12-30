const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clockwise_clockware',
    password: 'D@t@b@s32003',
    port: 5432,
})

const getOrders = (req, res) => {
    pool.query('SELECT * FROM orders ORDER BY id ASC', (error, results) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).send(results)
    })
}

// const getOrderById = (request, response) => {
//     const id = parseInt(request.params.id)
//
//     pool.query('SELECT * FROM orders WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }
//
// const createOrder = (request, response) => {
//     const {name, login, clockTipe, city, dateTime, masterId} = request.body
//
//     pool.query('INSERT INTO orders (name, login, clockTipe, city, dateTime, masterId) ' +
//         'VALUES ($1, $2,)', [name, login, clockTipe, city, dateTime, masterId], (error, result) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send(`User added with ID: ${result.insertId}`)
//     })
// }
//
// const updateOrder = (request, response) => {
//     const id = parseInt(request.params.id)
//     const {name, login, clockTipe, city, dateTime, masterId} = request.body
//
//     pool.query(
//         'UPDATE users SET name = $1, login = $2, clockTipe = $4, cityclockTipe = $5, dateTime = $6, masterId = $7 WHERE id = $3',
//         [name, login, id, clockTipe, city, dateTime, masterId],
//         (error, result) => {
//             if (error) {
//                 throw error
//             }
//             response.status(200).send(`User modified with ID: ${id}`)
//         }
//     )
// }
//
// const deleteOrder = (request, response) => {
//     const id = parseInt(request.params.id)
//
//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(`User deleted with ID: ${id}`)
//     })
// }

module.exports = {
    getOrders,
    // getOrderById,
    // createOrder,
    // updateOrder,
    // deleteOrder,
}