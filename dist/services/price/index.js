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
exports.countPrice = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const models_1 = __importDefault(require("../../models"));
const City = models_1.default.models.City;
const countPrice = (cityId, clockTypeId) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Counting order price...');
    const city = yield City.findByPk(cityId);
    return city.price * clockTypeId;
});
exports.countPrice = countPrice;
//# sourceMappingURL=index.js.map