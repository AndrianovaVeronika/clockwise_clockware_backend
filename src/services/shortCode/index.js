"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateShortCode = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};
exports.default = generateShortCode;
//# sourceMappingURL=index.js.map