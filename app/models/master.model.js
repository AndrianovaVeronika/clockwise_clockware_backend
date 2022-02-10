module.exports = (sequelize, Sequelize) => {
    const Master = sequelize.define("masters", {
        name: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER
        },
    });
    return Master;
};