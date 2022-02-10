const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const logger = require('./utils/logger');
require('dotenv').config();

db.sequelize.sync();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// index route
app.get("/", (req, res) => {
    res.json({ message: "Clockwise Clockware App" });
});

require('./app/routes')(app);

// listen for requests
app.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}.`);
});