'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../../connections/db.connection"));
class Code extends sequelize_1.Model {
    static associate(models) {
        Code.belongsTo(models.User, { foreignKey: 'userId' });
    }
}
Code.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
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