"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordValid = exports.getBcryptedPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getBcryptedPassword = (password) => {
    return bcryptjs_1.default.hashSync(password, 8);
};
exports.getBcryptedPassword = getBcryptedPassword;
const isPasswordValid = (passwordToCompare, compareWith) => bcryptjs_1.default.compareSync(passwordToCompare, compareWith);
exports.isPasswordValid = isPasswordValid;
//# sourceMappingURL=index.js.map