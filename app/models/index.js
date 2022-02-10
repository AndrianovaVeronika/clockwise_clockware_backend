const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: config.pool
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.city = require("../models/city.model")(sequelize, Sequelize);
db.clock_type = require("../models/clock_type.model")(sequelize, Sequelize);
db.master = require("../models/master.model")(sequelize, Sequelize);
db.order = require("../models/order.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "role_id",
    otherKey: "user_id"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "user_id",
    otherKey: "role_id"
});

db.city.belongsToMany(db.master, {
    through: "master_cities",
    foreignKey: "city_id",
    otherKey: "master_id"
})

db.master.belongsToMany(db.city, {
    through: "master_cities",
    foreignKey: "master_id",
    otherKey: "city_id"
})

db.ROLES = ["user", "admin"];

module.exports = db;