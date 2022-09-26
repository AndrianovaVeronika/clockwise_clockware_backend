"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ifObjectAssignedToOrder_1 = __importDefault(require("../../validators/ifObjectAssignedToOrder"));
const cityController = __importStar(require("../../controllers/city"));
const masterController = __importStar(require("../../controllers/master"));
const orderController = __importStar(require("../../controllers/order"));
const userController = __importStar(require("../../controllers/user"));
const router = (0, express_1.Router)();
router.delete("/cities/:id", [ifObjectAssignedToOrder_1.default.city], cityController.deleteByPk);
router.delete("/masters/:id", [ifObjectAssignedToOrder_1.default.master], masterController.deleteByPk);
router.delete("/orders/:id", orderController.deleteByPk);
router.delete("/users/:id", [ifObjectAssignedToOrder_1.default.user], userController.deleteByPk);
exports.default = router;
//# sourceMappingURL=delete.routes.js.map