const db = require("../api");
const express = require("express");
const router = express.Router();

router.get('/cities', db.getCities);
router.post('/cities', db.createCity);
router.delete('/cities/:id', db.deleteCity);

module.exports = router;