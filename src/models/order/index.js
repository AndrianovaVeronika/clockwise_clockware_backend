'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../../connections/db.connection"));
const city_1 = __importDefault(require("../city"));
const clocktype_1 = __importDefault(require("../clocktype"));
const master_1 = __importDefault(require("../master"));
const user_1 = __importDefault(require("../user"));
class Order extends sequelize_1.Model {
}
Order.belongsTo(city_1.default, { foreignKey: 'cityId' });
Order.belongsTo(clocktype_1.default, { foreignKey: 'clockTypeId' });
Order.belongsTo(master_1.default, { foreignKey: 'masterId' });
Order.belongsTo(user_1.default, { foreignKey: 'userId' });
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    time: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    isCompleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: db_connection_1.default,
    modelName: 'Order',
    paranoid: true,
    timestamps: true
});
exports.default = Order;
//# sourceMappingURL=index.js.map