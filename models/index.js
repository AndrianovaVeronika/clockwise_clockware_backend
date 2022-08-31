'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.City = require('./city')(sequelize, Sequelize.DataTypes);
db.ClockType = require('./clocktype')(sequelize, Sequelize.DataTypes);
db.Master = require('./master')(sequelize, Sequelize.DataTypes);
db.Order = require('./order')(sequelize, Sequelize.DataTypes);
db.Role = require('./role')(sequelize, Sequelize.DataTypes);
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Code = require('./code')(sequelize, Sequelize.DataTypes);
db.Price = require('./price')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.ROLES = ["user", "admin", "master"];

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
