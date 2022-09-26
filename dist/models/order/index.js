'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../../connections/db.connection"));
class Order extends sequelize_1.Model {
    // public readonly deletedAt!: Date;
    static associate(models) {
        Order.belongsTo(models.City, { foreignKey: 'cityId' });
        Order.belongsTo(models.ClockType, { foreignKey: 'clockTypeId' });
        Order.belongsTo(models.Master, { foreignKey: 'masterId' });
        Order.belongsTo(models.User, { foreignKey: 'userId' });
    }
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
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