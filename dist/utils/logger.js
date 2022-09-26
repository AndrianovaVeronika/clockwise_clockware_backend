"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
exports.default = (0, winston_1.createLogger)({
    transports: new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), winston_1.format.align(), winston_1.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`))
    }),
});
//# sourceMappingURL=logger.js.map