'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../../connections/db.connection"));
const order_1 = __importDefault(require("../order"));
const city_1 = __importDefault(require("../city"));
const user_1 = __importDefault(require("../user"));
class Master extends sequelize_1.Model {
}
Master.hasMany(order_1.default, { foreignKey: 'masterId' });
Master.belongsToMany(city_1.default, { through: 'MasterCities' });
Master.belongsTo(user_1.default, { foreignKey: 'userId' });
Master.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    sequelize: db_connection_1.default,
    modelName: 'Master',
    paranoid: true,
    timestamps: true
});
exports.default = Master;
//# sourceMappingURL=index.js.map