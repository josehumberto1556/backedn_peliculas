'use strict';

// Importa bcrypt para hashear las contraseñas
const bcrypt = require('bcrypt'); // Usamos require aquí porque los seeders son JS puro, no TS.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // El método 'up' se ejecuta cuando aplicas el seeder.
  // Aquí es donde insertas los datos.
  async up (queryInterface, Sequelize) {
    // Hashea las contraseñas antes de insertarlas
    const hashedPasswordAdmin = await bcrypt.hash('adminpassword', 10); // Contraseña para el admin
    const hashedPasswordUser = await bcrypt.hash('userpassword', 10);   // Contraseña para un usuario normal

    await queryInterface.bulkInsert('usuarios', [
      {
        
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@example.com',
        password: hashedPasswordAdmin, // Contraseña hasheada para el admin
        role: 'admin',                 // Rol de administrador
        created_at: new Date(),
        updated_at: new Date()
      },
      {
       
        first_name: 'Juan',
        last_name: 'Perez',
        email: 'juan.perez@example.com',
        password: hashedPasswordUser,  // Contraseña hasheada para el usuario
        role: 'user',                  // Rol de usuario
        created_at: new Date(),
        updated_at: new Date()
      },
      // Puedes añadir más usuarios aquí si lo necesitas
      // {
      //   username: 'editor',
      //   firstName: 'Editor',
      //   lastName: 'Content',
      //   email: 'editor@example.com',
      //   password: await bcrypt.hash('editorpass', 10),
      //   role: 'editor',
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // }
    ], {});
  },

  // El método 'down' se ejecuta cuando deshaces el seeder.
  // Aquí es donde defines cómo eliminar los datos insertados.
  async down (queryInterface, Sequelize) {
    // Puedes eliminar por email, username o vaciar toda la tabla.
    // Usaremos email para mayor seguridad y especificidad.
    await queryInterface.bulkDelete('usuarios', {
      email: ['admin@example.com', 'juan.perez@example.com'] // Elimina los usuarios específicos
    }, {});
    // O si quieres vaciar toda la tabla de usuarios insertados por este seeder:
    // await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
