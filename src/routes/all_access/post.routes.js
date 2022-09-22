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
// import * as userController from "../../controllers/user";
const masterController = __importStar(require("../../controllers/master"));
// import * as cityController from "../../controllers/city";
const authController = __importStar(require("../../controllers/auth"));
// import * as clockTypeController from "../../controllers/clockType";
const orderController = __importStar(require("../../controllers/order"));
const express_1 = require("express");
const ifBodyUndefined_1 = __importDefault(require("../../validators/ifBodyUndefined"));
const user_validator_1 = require("../../validators/user.validator");
const order_validator_1 = require("../../validators/order.validator");
const router = (0, express_1.Router)();
router.use(ifBodyUndefined_1.default);
router.post("/register/user", [user_validator_1.checkDuplicateEmail, user_validator_1.checkUserName, user_validator_1.checkUserPassword], authController.registerUser);
router.post("/register/master", [user_validator_1.checkDuplicateEmail, user_validator_1.checkUserName, user_validator_1.checkUserPassword], authController.registerMaster);
router.post("/signin", authController.signin);
router.post("/orders", [order_validator_1.ifDateTimeAppropriate, order_validator_1.ifOrderInterrogates], orderController.create);
router.post("/masters/available", masterController.findAllMastersAvailable);
router.post('/verify/user/created', authController.createUserOrFindIfAuthorized);
exports.default = router;
//# sourceMappingURL=post.routes.js.map