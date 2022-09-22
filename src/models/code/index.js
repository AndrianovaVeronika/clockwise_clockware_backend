'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../../connections/db.connection"));
const user_1 = __importDefault(require("../user"));
class Code extends sequelize_1.Model {
}
Code.belongsTo(user_1.default, { foreignKey: 'userId' });
Code.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    verificationCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db_connection_1.default,
    modelName: 'Code',
    timestamps: true
});
exports.default = Code;
//# sourceMappingURL=index.js.map