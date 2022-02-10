const {pool} = require("../app/middleware/pool");

const getMasters = (req, res) => {
    pool.query('SELECT * FROM masters ORDER BY id ASC', (error, result) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).send(result.rows)
    })
}

const getMasterById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM masters WHERE id = $1', [id],
        (error, result) => {
            if (error) {
                res.status(500).send(error);
            }
            res.status(200).json(result.rows);
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

module.exports = {
    getMasters,
    getMasterById,
    createMaster,
    deleteMaster
}