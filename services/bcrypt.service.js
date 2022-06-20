const bcrypt = require("bcryptjs");
exports.getBcryptedPassword = (password) => {
    return bcrypt.hashSync(password, 8);
}