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
exports.findOneWhere = exports.create = void 0;
const models_1 = __importDefault(require("../../models"));
const Code = models_1.default.models.Code;
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Code.create(payload);
});
exports.create = create;
const findOneWhere = (where) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Code.findOne({ where });
});
exports.findOneWhere = findOneWhere;
//# sourceMappingURL=index.js.map