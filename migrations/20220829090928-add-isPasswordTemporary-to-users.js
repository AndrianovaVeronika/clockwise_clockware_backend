'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users',
        'isPasswordTemporary',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'isPasswordTemporary')
  }
};
