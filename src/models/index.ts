'use strict';
import {Sequelize} from "sequelize";
import sequelize from "../connections/db.connection";
import City from "./city";
import ClockType from "./clocktype";
import Code from "./code";
import Master from "./master";
import Order from "./order";
import Role from "./role";
import User from "./user";

const db = {
    models: {
        City,
        ClockType,
        Master,
        Order,
        Role,
        User,
        Code
    },
    ROLES: {1: "user", 2: "admin", 3: "master"},
    sequelize,
    Sequelize
};

export default db;
