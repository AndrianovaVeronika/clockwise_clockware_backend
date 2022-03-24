const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const cities = require('./app/routes/city.routes');
const auth = require('./app/routes/auth.routes');
const clockTypes = require('./app/routes/clock_type.routes');
const mail = require('./app/routes/mail.routes');
const masters = require('./app/routes/master.routes');
const orders = require('./app/routes/order.routes');
const users = require('./app/routes/user.routes');
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

app.use('/api/cities', cities);
app.use('/api', auth);
app.use('/api/clock_types', clockTypes);
app.use('/api/mail', mail);
app.use('/api/masters', masters);
app.use('/api/orders', orders);
app.use('/api/users', users);

// listen for requests
app.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}.`);
});