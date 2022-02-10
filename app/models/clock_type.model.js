module.exports = (sequelize, Sequelize) => {
    const Clock_type = sequelize.define("clock_types", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
    return Clock_type;
};