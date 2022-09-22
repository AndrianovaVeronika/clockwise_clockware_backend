"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv");
exports.default = {
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
};
//# sourceMappingURL=mail.config.js.map