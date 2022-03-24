const router = require('express').Router();
const controller = require('../controllers/mail.controller');

router.post("/", controller.sendMail);

module.exports = router;