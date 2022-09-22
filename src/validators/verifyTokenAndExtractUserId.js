"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const jwt_1 = require("../services/jwt");
exports.default = (req, res, next) => {
    try {
        logger_1.default.info("Verifying user token for access...");
        if (req.headers.special_admin_key === process.env.SPECIAL_ADMIN_KEY) {
            logger_1.default.info("User provided special admin key. Heading next...");
            next();
            return;
        }
        const token = req.headers["x-access-token"];
        if (!token) {
            logger_1.default.error("No token provided!");
            return res.status(400).send({ message: "No token provided!" });
        }
        (0, jwt_1.verifyToken)(token.toString());
    }
    catch (e) {
        logger_1.default.error(e.message);
        return res.status(500).send({ message: e.message });
    }
};
//# sourceMappingURL=verifyTokenAndExtractUserId.js.map