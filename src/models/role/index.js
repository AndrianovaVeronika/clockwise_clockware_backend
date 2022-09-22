'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../../connections/db.connection"));
const user_1 = __importDefault(require("../user"));
class Role extends sequelize_1.Model {
}
Role.belongsToMany(user_1.default, { through: 'UserRoles' });
Role.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize: db_connection_1.default,
    modelName: 'Role',
    timestamps: true
});
exports.default = Role;
//# sourceMappingURL=index.js.map