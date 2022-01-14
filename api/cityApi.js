const {pool} = require("../pool");

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

module.exports = {
    getCities,
    createCity,
    deleteCity,
}