const router = require('express').Router();
const controller = require('../controllers/mail.controller');

module.exports = app => {
    router.post("/", controller.sendMail);

    app.use('/api/mail', router);
};