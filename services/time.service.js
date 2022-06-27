exports.parseTimeStringToInt = time => parseInt(time.substring(0, 2));
exports.parseIntToTimeString = time => time + ':00:00';