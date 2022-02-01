const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes');
require('dotenv').config();

app.use(cors());

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({info: 'Clockwise Clockware backend API'})
});

app.use(router);

app.listen(process.env.DB_PORT, () => {
    console.log(`App running on port ${process.env.DB_PORT}.`)
});