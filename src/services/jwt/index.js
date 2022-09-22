"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const auth_config_1 = __importDefault(require("../../config/auth.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId) => jsonwebtoken_1.default.sign({ id: userId }, auth_config_1.default.secret, {
    expiresIn: 86400 // 24 hours
});
exports.generateToken = generateToken;
const verifyToken = (token) => {
    jsonwebtoken_1.default.verify(token, auth_config_1.default.secret, (err) => __awaiter(void 0, void 0, void 0, function* () {
        return !err;
    }));
    return undefined;
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=index.js.map