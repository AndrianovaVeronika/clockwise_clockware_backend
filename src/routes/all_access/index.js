"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_routes_1 = __importDefault(require("./get.routes"));
const post_routes_1 = __importDefault(require("./post.routes"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use('/', get_routes_1.default);
router.use('/', post_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map