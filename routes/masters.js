const db = require("../api");
const express = require("express");
const router = express.Router();

router.get('/masters', db.getMasters);
router.get('/masters/:id', db.getMasterById)
router.post('/masters', db.createMaster);
router.delete('/masters/:id', db.deleteMaster);

module.exports = router;