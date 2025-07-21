import { Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';
import { Op } from 'sequelize'; // ¡Asegúrate de importar 'Op' de Sequelize!
import bcrypt from 'bcrypt'

export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.query; // Captura el parámetro 'email' de la URL (ej. ?email=...)

    let users;
    let queryOptions: any = {}; // Objeto para construir la consulta a Sequelize
    let queryEmail: string = ''; // Para guardar el email buscado y pasarlo de vuelta a la vista

    if (email) { // Si el usuario envió un término de búsqueda por email
      queryEmail = email.toString(); // Convierte el valor a string por seguridad

      // Configura la cláusula WHERE para buscar coincidencias parciales en el email
      queryOptions.where = {
        email: {
          [Op.like]: `%${queryEmail}%` // Busca emails que CONTENGAN el texto ingresado (case-insensitive en MySQL/PostgreSQL)
        }
      };
      
    }

    // Realiza la consulta a la base de datos con las opciones de búsqueda
    users = await Usuario.findAll(queryOptions);

    console.log("Listado de Usuarios (filtrado o completo):");
    console.table(users.map(u => u.toJSON())); // Muestra los resultados en la consola del servidor
    const successMessage = req.query.successMessage as string | undefined;
    // Renderiza la vista 'usuarios.ejs', pasando los datos necesarios
    res.render('usuarios', {
      users: users,             // Los usuarios encontrados (filtrados o todos)
      title: 'Dashboard de Usuarios', // Título de la página
      queryEmail: queryEmail,    // El término de búsqueda para que se mantenga en el input del buscador
      successMessage: successMessage
    });

  } catch (error: any) {
    console.error('Error fetching users for HTML view:', error);
    res.status(500).send({ message: 'Error retrieving users', error: error.message });
  }
};

// NUEVA FUNCIÓN: Para mostrar el formulario de registro
export const registro = (req: Request, res: Response) => {
  res.render('registro-usuario', { title: 'Registrar Nuevo Usuario' });
};

export const crearUsuario = async (req: Request, res: Response) => {
    try {
        // Usa first_name y last_name para coincidir con tu modelo
        const { first_name, last_name, email, password, role } = req.body;

        // Valida que todos los campos obligatorios estén llenos
        if (!first_name || !last_name || !email || !password || !role) {
           res.status(400).send('Todos los campos son obligatorios (nombre, apellido, email, contraseña, rol).');
           return 
          }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Usuario.create({
            first_name, // <-- Usar first_name
            last_name,  // <-- Usar last_name
            email,
            password: hashedPassword,
            role: role,
        });

        console.log('Usuario registrado con éxito:', newUser.toJSON());
        res.redirect('/usuarios?successMessage=' + encodeURIComponent('Usuario registrado con éxito.'));
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send('El email ya está registrado.'); // Solo email porque username no está en tu modelo
        }
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error al registrar el usuario.');
    }
};

//  Para mostrar el formulario de edición de usuario
export const editar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findByPk(id); // Buscar usuario por su ID

    if (!user) {
      return res.status(404).send('Usuario no encontrado.');
    }

    res.render('editar-usuario', { user: user.toJSON(), title: 'Editar Usuario' });
  } catch (error: any) {
    console.error('Error al cargar formulario de edición:', error);
    res.status(500).send('Error al cargar la página de edición.');
  }
};


export const editarUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        // Usa first_name y last_name para coincidir con tu modelo
        const { first_name, last_name, email, password, role } = req.body;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
          res.status(404).send('Usuario no encontrado.');
          return
        }

        // Actualiza los campos del usuario usando snake_case
        usuario.first_name = first_name; // <-- Usar first_name
        usuario.last_name = last_name;   // <-- Usar last_name
        usuario.email = email;
        usuario.role = role;

        // Solo actualiza la contraseña si se proporcionó una nueva y no está vacía
        if (password && password.trim() !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            usuario.password = hashedPassword;
        }

        await usuario.save();

        console.log('Usuario actualizado con éxito:', usuario.toJSON());
        res.redirect('/usuarios?successMessage=' + encodeURIComponent('Usuario actualizado con éxito.'));
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send('El email ya está registrado por otro usuario.');
            return
          }
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error al actualizar el usuario.');
    }
};


export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findByPk(id);

    if (!user) {
      return res.status(404).send('Usuario no encontrado.');
    }

    await user.destroy(); // Elimina el usuario

    console.log('Usuario eliminado con éxito:', id);
    res.redirect('/usuarios?successMessage='+ encodeURIComponent('Usuario eliminado con exito.')); // Redirige al listado
  } catch (error: any) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).send('Error al eliminar el usuario.');
  }
};