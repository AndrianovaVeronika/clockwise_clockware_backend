const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clockwise_clockware',
    password: 'D@t@b@s32003',
    port: 5432,
})

const getOrders = (req, res) => {
    pool.query('SELECT ' +
        'orders.id, ' +
        'orders.name as client_name, ' +
        'orders.login, ' +
        'orders.clock_type, ' +
        'orders.date, ' +
        'orders.time, ' +
        'masters.name as master_name, ' +
        'cities.name as city ' +
        'FROM orders ' +
        'LEFT OUTER JOIN masters ON masters.id = master_id ' +
        'LEFT OUTER JOIN cities ON cities.id = city_id ' +
        'ORDER BY id ASC',
        (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).send(result.rows)
    })
}

const getOrderById = (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id);
    pool.query('SELECT * FROM orders WHERE id = $1', [id],
        (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).json(result.rows)
    })
}

const createOrder = (req, res) => {
    const {name, login, clock_type, master_id, city_id, date, time} = req.body
    pool.query('INSERT INTO orders (name, login, clock_type, master_id, city_id, date, time) ' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, login, clock_type, master_id, city_id, date, time],
        (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(201).send('Order added')
    })
}

const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM orders WHERE id = $1', [id], (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).send('Order deleted')
    })
}

const getMasters = (req, res) => {
  pool.query('SELECT * FROM masters ORDER BY id ASC', (error, result) => {
      if (error) {
          res.status(500).send(error)
      }
      res.status(200).send(result.rows)
  })
}

const createMaster = (req, res) => {
    const {name, rating} = req.body
    pool.query('INSERT INTO masters (name, rating) ' +
        'VALUES ($1, $2)', [name, rating], (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(201).send('Master added')
    })
}

const deleteMaster = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM masters WHERE id = $1', [id], (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).send('Master deleted')
    })
}

const getCities = (req, res) => {
    pool.query('SELECT * FROM cities ORDER BY id ASC', (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).send(result.rows)
    })
}

const createCity = (req, res) => {
    const {name} = req.body
    pool.query('INSERT INTO cities (name) ' +
        'VALUES ($1)', [name], (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(201).send('City added')
    })
}

const deleteCity = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM cities WHERE id = $1', [id], (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).send('City deleted')
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
    getMasters,
    createMaster,
    deleteMaster,
    getCities,
    createCity,
    deleteCity
}