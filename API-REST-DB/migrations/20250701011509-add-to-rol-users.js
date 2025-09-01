'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios', 'rol', {
      type: Sequelize.ENUM('admin','moderador', 'cliente' ),
      allowNull: false,
      defaultValue: 'cliente'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuarios', 'rol');
  }
};
