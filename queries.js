const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clockwise_clockware',
    password: 'D@t@b@s32003',
    port: 5432,
})

const getOrders = (req, res) => {
    pool.query('SELECT * FROM orders ORDER BY id ASC', (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).send(result.rows)
    })
}

const getOrderById = (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id);
    pool.query('SELECT * FROM orders WHERE id = $1', [id], (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).json(result.rows)
    })
}

const createOrder = (req, res) => {
    const {name, login, clocktype, city, datetime, masterid} = req.body
    pool.query('INSERT INTO orders (name, login, clocktype, city, dateTime, masterid) ' +
        'VALUES ($1, $2, $3, $4, $5, $6)', [name, login, clocktype, city, datetime, masterid], (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(201).send('User added')
    })
}

const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id)
    console.log(req.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).send('User deleted')
    })
}

// const updateOrder = (req, res) => {
//     const id = parseInt(req.params.id)
//     const {name, login, clocktype, city, datetime, masterid} = req.body
//
//     pool.query(
//         'UPDATE users SET name = $2, login = $3, clocktype = $4, city = $5, datetime = $6, masterid = $7 WHERE id = $1',
//         [id, name, login, clocktype, city, datetime, masterid],
//         (error, result) => {
//             if (error) {
//                 res.status(500).send(error)
//             }
//             res.status(200).send('User modified')
//         }
//     )
// }

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    deleteOrder,
    // updateOrder,
}