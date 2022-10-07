import dotenv from "dotenv";
dotenv.config();
import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import logger from "./utils/logger";

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

// connect router
app.use('/', router);

// listen for requests
try {
    app.listen(process.env.PORT, () => {
        logger.info(`Server is running on port ${process.env.PORT}.`);
    });
} catch (error) {
    logger.error(`Error occurred: ${error.message}`);
}