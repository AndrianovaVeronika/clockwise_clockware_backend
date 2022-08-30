const {getBcryptedPassword} = require("../services/bcrypt.service");
const db = require('../models');
const {Master, City} = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

const createAccount = async (name, email, password, rolesNames, isPasswordTemporary) => {
    const roles = [];
    for (const rolesKey in db.ROLES) {
        if (rolesNames.includes(db.ROLES[rolesKey])) {
            roles.push(rolesKey);
        }
    }
    const newUser = {
        name: name,
        email: email,
        password: getBcryptedPassword(password, 8),
        isPasswordTemporary
    }
    const user = await User.create(newUser);
    await user.setRoles(roles);
    return await User.findByPk(user.id, {
        attributes: {exclude: ['password']}
    });
};

exports.createUserAccount = async ({name, email, password, isPasswordTemporary}) => {
    return await createAccount(name, email, password, ['user'], isPasswordTemporary);
};

exports.createMasterAccount = async ({name, email, cities, password, rating, isPasswordTemporary}) => {
    const createdUser = await createAccount(name, email, password, ['master'], isPasswordTemporary);
    const master = await Master.create({name: name, rating: rating, userId: createdUser.id});
    const masterCities = await City.findAll({
        where: {
            name: {
                [Op.or]: cities
            }
        }
    });
    await master.setCities(masterCities);
    return {user: createdUser, master: {...master, cities}};
};

// exports.createAdminAccount = async (name, email, password) => {
//     await createAccount(name, email, password, ['admin']);
// };