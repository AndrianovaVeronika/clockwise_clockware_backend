import express, {Request, Response} from 'express'

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");
const masterRoutes = require('./routes/master_access');
const adminRoutes = require('./routes/admin_access');
const allRoutes = require('./routes/all_access');
const userRoutes = require('./routes/user_access');
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
app.get("/", async (req: Request, res: Response) => {
    return res.status(200).send({message: "Clockwise Clockware App"});
});

// connect routers
app.use('/', allRoutes);
app.use('/', userRoutes);
app.use('/', masterRoutes);
app.use('/', adminRoutes);

// listen for requests
try {
    app.listen(process.env.PORT, () => {
        logger.info(`Server is running on port ${process.env.PORT}.`);
    });
} catch (error) {
    logger.error(`Error occurred: ${error.message}`);
}