'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // El método 'up' se ejecuta cuando aplicas esta migración.
  // Aquí es donde creas la tabla 'Peliculas' con todas sus columnas.
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('peliculas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      title: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      genre: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      director: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      releaseYear: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      posterUrl: { // ¡El nuevo campo posterUrl incluido aquí!
        type: Sequelize.STRING(255),
        allowNull: true, // Puede ser nulo si no se proporciona un póster
        defaultValue: '/img/default-movie-poster.png' // Valor por defecto
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  // El método 'down' se ejecuta cuando deshaces esta migración.
  // Aquí es donde defines cómo revertir los cambios (eliminar la tabla).
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('peliculas');
  }
};