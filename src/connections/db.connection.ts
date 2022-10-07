import {Sequelize} from "sequelize";
import config from "../config/db.config";

const dbConfig = config[process.env.NODE_ENV as keyof typeof config];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

export default sequelize;