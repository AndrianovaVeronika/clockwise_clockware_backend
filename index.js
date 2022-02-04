const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors');
require('dotenv').config();
const logger = require('./utils/logger');

app.use(cors());

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({info: 'Clockwise Clockware backend API'});
    logger.info('Home request send api name');
});

app.use(router);

// Capture 404 erors
app.use((req,res,next) => {
    res.status(404).send("PAGE NOT FOUND");
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// Run the server
app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}.`);
    logger.info(`Server started and running on http://${process.env.DB_HOST}:${process.env.PORT}`)
});