import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import cors from "cors";
import masterRoutes from "./src/routes/master_access";
import adminRoutes from "./src/routes/master_access";
import "dotenv";
import allRoutes from "./src/routes/all_access";
import userRoutes from "./src/routes/user_access";
import logger from "./src/utils/logger";

const app = express();

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

export {};