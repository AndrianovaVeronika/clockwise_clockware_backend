module.exports = (sequelize, Sequelize) => {
    const ClockType = sequelize.define("clock_types", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
    return ClockType;
};