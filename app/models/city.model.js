module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("cities", {
        name: {
            type: Sequelize.STRING
        },
    });
    return City;
};