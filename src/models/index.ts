'use strict';
import Sequelize from "sequelize";
import sequelize from "../connections/db.connection";
import City from "./city";
import ClockType from "./clocktype";
import Code from "./code";
import Master from "./master";
import Order from "./order";
import Role from "./role";
import User from "./user";

City.hasMany(Order, {foreignKey: 'cityId'});
City.belongsToMany(Master, {through: 'MasterCities'});

ClockType.hasMany(Order, {foreignKey: 'clockTypeId'});

Code.belongsTo(User, {foreignKey: 'userId'});

Master.hasMany(Order, {foreignKey: 'masterId'});
Master.belongsToMany(City, {through: 'MasterCities'});
Master.belongsTo(User, {foreignKey: 'userId'});

Order.belongsTo(City, {foreignKey: 'cityId'});
Order.belongsTo(ClockType, {foreignKey: 'clockTypeId'});
Order.belongsTo(Master, {foreignKey: 'masterId'});
Order.belongsTo(User, {foreignKey: 'userId'});

Role.belongsToMany(User, {through: 'UserRoles'});

User.hasMany(Order, {foreignKey: 'userId'});
User.hasOne(Master, {foreignKey: 'userId'});
User.hasOne(Code, {foreignKey: 'userId'});
User.belongsToMany(Role, {through: 'UserRoles'});

const db = {
    models: {
        City,
        ClockType,
        Master,
        Order,
        Role,
        User,
        Code,
    },
    sequelize,
    Sequelize
};

export default db;
