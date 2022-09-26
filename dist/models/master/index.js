'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../../connections/db.connection"));
class Master extends sequelize_1.Model {
    static associate(models) {
        Master.hasMany(models.Order, { foreignKey: 'masterId' });
        Master.belongsToMany(models.City, { through: 'MasterCities' });
        Master.belongsTo(models.User, { foreignKey: 'userId' });
    }
}
Master.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
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