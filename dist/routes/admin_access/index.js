"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ifBodyUndefined_1 = __importDefault(require("../../validators/ifBodyUndefined"));
const verifyTokenAndExtractUserId_1 = __importDefault(require("../../validators/verifyTokenAndExtractUserId"));
const roles_validator_1 = require("../../validators/roles.validator");
const delete_routes_1 = __importDefault(require("./delete.routes"));
const get_routes_1 = __importDefault(require("./get.routes"));
const post_routes_1 = __importDefault(require("./post.routes"));
const put_routes_1 = __importDefault(require("./put.routes"));
const router = (0, express_1.Router)();
router.use(ifBodyUndefined_1.default);
router.use(ifBodyUndefined_1.default);
router.use(ifBodyUndefined_1.default);
router.use(verifyTokenAndExtractUserId_1.default);
router.use(roles_validator_1.isAdmin);
router.use('/', delete_routes_1.default);
router.use('/', get_routes_1.default);
router.use('/', post_routes_1.default);
router.use('/', put_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map