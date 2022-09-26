"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const put_routes_1 = __importDefault(require("./put.routes"));
const get_routes_1 = __importDefault(require("./get.routes"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use('/', put_routes_1.default);
router.use('/', get_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map