"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIntToTimeString = exports.parseTimeStringToInt = void 0;
const parseTimeStringToInt = (time) => parseInt(time.substring(0, 2), 10);
exports.parseTimeStringToInt = parseTimeStringToInt;
const parseIntToTimeString = (int) => int + ':00:00';
exports.parseIntToTimeString = parseIntToTimeString;
//# sourceMappingURL=index.js.map