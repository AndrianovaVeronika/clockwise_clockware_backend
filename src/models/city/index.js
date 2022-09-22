'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../../connections/db.connection"));
const order_1 = __importDefault(require("../order"));
const master_1 = __importDefault(require("../master"));
class City extends sequelize_1.Model {
}
City.hasMany(order_1.default, { foreignKey: 'cityId' });
City.belongsToMany(master_1.default, { through: 'MasterCities' });
City.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    sequelize: db_connection_1.default,
    modelName: 'Index',
    paranoid: true,
    timestamps: true
});
exports.default = City;
//# sourceMappingURL=index.js.map