'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'password', {
      type: Sequelize.STRING(255),
      allowNull: false, // La contraseña no puede ser nula
      // Si la tabla ya tiene datos, necesitarás un defaultValue temporal
      // o asegurarte de que tu seed o un script posterior rellene este campo.
      // Por ahora, lo dejamos sin defaultValue si es una tabla nueva.
      // Si ya hay usuarios, puedes poner un defaultValue temporal o una lógica para llenarlo.
      // defaultValue: 'temp_password' // Opcional: para rellenar existentes, luego se debería actualizar
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'password');
  }
};