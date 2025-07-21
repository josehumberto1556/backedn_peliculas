'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // El método 'up' se ejecuta cuando aplicas esta migración.
  // Aquí es donde añades la nueva columna 'role' a tu tabla 'Usuarios'.
  async up (queryInterface, Sequelize) {
    // Añade la columna 'role' a la tabla 'Usuarios'
    await queryInterface.addColumn('usuarios', 'role', {
      type: Sequelize.STRING(50), // Define el tipo de dato como STRING (para roles como 'user', 'admin')
      allowNull: false,          // El rol no puede ser nulo
      defaultValue: 'user'       // Asigna un rol por defecto a los usuarios existentes que no lo tengan
    });
    // Nota: El campo 'password' no se añade aquí, se asume que ya existe.
    // Si 'password' NO existe, esta migración NO lo creará.
  },

  // El método 'down' se ejecuta cuando deshaces esta migración.
  // Aquí es donde defines cómo revertir los cambios (eliminar la columna 'role').
  async down (queryInterface, Sequelize) {
    // Elimina la columna 'role' de la tabla 'Usuarios'
    await queryInterface.removeColumn('usuarios', 'role');
  }
};