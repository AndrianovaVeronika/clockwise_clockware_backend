'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../../connections/db.connection"));
const order_1 = __importDefault(require("../order"));
const master_1 = __importDefault(require("../master"));
const code_1 = __importDefault(require("../code"));
const role_1 = __importDefault(require("../role"));
class User extends sequelize_1.Model {
}
User.hasMany(order_1.default, { foreignKey: 'userId' });
User.belongsToMany(role_1.default, { through: 'UserRoles' });
User.hasOne(master_1.default, { foreignKey: 'userId' });
User.hasOne(code_1.default, { foreignKey: 'userId' });
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    emailChecked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    isPasswordTemporary: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: db_connection_1.default,
    modelName: 'User',
    paranoid: true,
    timestamps: true
});
exports.default = User;
//# sourceMappingURL=index.js.map