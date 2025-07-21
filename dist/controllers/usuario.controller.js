"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.editarUsuario = exports.editar = exports.crearUsuario = exports.registro = exports.getUsuarios = void 0;
const usuario_model_1 = require("../models/usuario.model");
const sequelize_1 = require("sequelize"); // ¡Asegúrate de importar 'Op' de Sequelize!
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsuarios = async (req, res) => {
    try {
        const { email } = req.query; // Captura el parámetro 'email' de la URL (ej. ?email=...)
        let users;
        let queryOptions = {}; // Objeto para construir la consulta a Sequelize
        let queryEmail = ''; // Para guardar el email buscado y pasarlo de vuelta a la vista
        if (email) { // Si el usuario envió un término de búsqueda por email
            queryEmail = email.toString(); // Convierte el valor a string por seguridad
            // Configura la cláusula WHERE para buscar coincidencias parciales en el email
            queryOptions.where = {
                email: {
                    [sequelize_1.Op.like]: `%${queryEmail}%` // Busca emails que CONTENGAN el texto ingresado (case-insensitive en MySQL/PostgreSQL)
                }
            };
        }
        // Realiza la consulta a la base de datos con las opciones de búsqueda
        users = await usuario_model_1.Usuario.findAll(queryOptions);
        console.log("Listado de Usuarios (filtrado o completo):");
        console.table(users.map(u => u.toJSON())); // Muestra los resultados en la consola del servidor
        const successMessage = req.query.successMessage;
        // Renderiza la vista 'usuarios.ejs', pasando los datos necesarios
        res.render('usuarios', {
            users: users, // Los usuarios encontrados (filtrados o todos)
            title: 'Dashboard de Usuarios', // Título de la página
            queryEmail: queryEmail, // El término de búsqueda para que se mantenga en el input del buscador
            successMessage: successMessage
        });
    }
    catch (error) {
        console.error('Error fetching users for HTML view:', error);
        res.status(500).send({ message: 'Error retrieving users', error: error.message });
    }
};
exports.getUsuarios = getUsuarios;
// NUEVA FUNCIÓN: Para mostrar el formulario de registro
const registro = (req, res) => {
    res.render('registro-usuario', { title: 'Registrar Nuevo Usuario' });
};
exports.registro = registro;
const crearUsuario = async (req, res) => {
    try {
        // Usa first_name y last_name para coincidir con tu modelo
        const { first_name, last_name, email, password, role } = req.body;
        // Valida que todos los campos obligatorios estén llenos
        if (!first_name || !last_name || !email || !password || !role) {
            res.status(400).send('Todos los campos son obligatorios (nombre, apellido, email, contraseña, rol).');
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await usuario_model_1.Usuario.create({
            first_name, // <-- Usar first_name
            last_name, // <-- Usar last_name
            email,
            password: hashedPassword,
            role: role,
        });
        console.log('Usuario registrado con éxito:', newUser.toJSON());
        res.redirect('/usuarios?successMessage=' + encodeURIComponent('Usuario registrado con éxito.'));
    }
    catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send('El email ya está registrado.'); // Solo email porque username no está en tu modelo
        }
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error al registrar el usuario.');
    }
};
exports.crearUsuario = crearUsuario;
//  Para mostrar el formulario de edición de usuario
const editar = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usuario_model_1.Usuario.findByPk(id); // Buscar usuario por su ID
        if (!user) {
            return res.status(404).send('Usuario no encontrado.');
        }
        res.render('editar-usuario', { user: user.toJSON(), title: 'Editar Usuario' });
    }
    catch (error) {
        console.error('Error al cargar formulario de edición:', error);
        res.status(500).send('Error al cargar la página de edición.');
    }
};
exports.editar = editar;
const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // Usa first_name y last_name para coincidir con tu modelo
        const { first_name, last_name, email, password, role } = req.body;
        const usuario = await usuario_model_1.Usuario.findByPk(id);
        if (!usuario) {
            res.status(404).send('Usuario no encontrado.');
            return;
        }
        // Actualiza los campos del usuario usando snake_case
        usuario.first_name = first_name; // <-- Usar first_name
        usuario.last_name = last_name; // <-- Usar last_name
        usuario.email = email;
        usuario.role = role;
        // Solo actualiza la contraseña si se proporcionó una nueva y no está vacía
        if (password && password.trim() !== '') {
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            usuario.password = hashedPassword;
        }
        await usuario.save();
        console.log('Usuario actualizado con éxito:', usuario.toJSON());
        res.redirect('/usuarios?successMessage=' + encodeURIComponent('Usuario actualizado con éxito.'));
    }
    catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send('El email ya está registrado por otro usuario.');
            return;
        }
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error al actualizar el usuario.');
    }
};
exports.editarUsuario = editarUsuario;
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usuario_model_1.Usuario.findByPk(id);
        if (!user) {
            return res.status(404).send('Usuario no encontrado.');
        }
        await user.destroy(); // Elimina el usuario
        console.log('Usuario eliminado con éxito:', id);
        res.redirect('/usuarios?successMessage=' + encodeURIComponent('Usuario eliminado con exito.')); // Redirige al listado
    }
    catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send('Error al eliminar el usuario.');
    }
};
exports.eliminarUsuario = eliminarUsuario;
//# sourceMappingURL=usuario.controller.js.map