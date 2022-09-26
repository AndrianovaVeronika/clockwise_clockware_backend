'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../../connections/db.connection"));
class User extends sequelize_1.Model {
    static associate(models) {
        User.hasMany(models.Order, { foreignKey: 'userId' });
        User.belongsToMany(models.Role, { through: 'UserRoles' });
        User.hasOne(models.Master, { foreignKey: 'userId' });
        User.hasOne(models.Code, { foreignKey: 'userId' });
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
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