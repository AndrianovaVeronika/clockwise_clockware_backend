'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Cities',
        'price',
        {
          type: Sequelize.DOUBLE
        },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cities', 'price');
  }
};
