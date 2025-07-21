// src/controllers/auth.controller.ts
import { Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { Usuario } from '../models/usuario.model'

// Función para mostrar la página de login
export const mostrarLogin = (req: Request, res: Response): void => {
     try
     {
         const errorMessage = req.query.error ? decodeURIComponent(req.query.error.toString()) : undefined;
         res.render('cuenta-usuario', { title: 'Iniciar Sesión', errorMessage: errorMessage });
     }
     catch(error: any)
     {
       console.error('Error fetching users for HTML view:', error);
       res.status(500).send({ message: 'Error retrieving users', error: error.message });
     }
};

// Función para procesar el intento de login
export const login = async (req: Request, res: Response): Promise<void> => 
{

    const { email, password } = req.body;
    console.log(email)
    console.log(password)
    // Validación básica: Asegúrate de que email y contraseña no estén vacíos.
    if (!email || !password) {
        console.log('Intento de login fallido: Email o contraseña vacíos.');
        // Redirige de vuelta a la página de login con un mensaje de error
        res.redirect('/?error=' + encodeURIComponent('Por favor, ingresa tu email y contraseña.'));
        return;
    }

    try {
        
        const user = await Usuario.findOne({ where: { email: email } });

        
        if (!user) {
            console.log('Intento de login fallido: Usuario no encontrado para el email:', email);
            res.redirect('/?error=' + encodeURIComponent('Usuario o contraseña incorrectos.'));
            return;
        }

       
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          
            console.log('Login exitoso para:', user.email);

            res.redirect('/usuarios');

        } else {
            // Si la contraseña no es válida, redirecciona con un error
            console.log('Intento de login fallido: Contraseña incorrecta para el email:', email);
            res.redirect('/?error=' + encodeURIComponent('Usuario o contraseña incorrectos.'));
        }

    } catch (error) {
        // Manejo de errores durante la operación de la base de datos o bcrypt
        console.error('Error en el proceso de login:', error);
        // Redirige con un error genérico del servidor
        res.redirect('/?error=' + encodeURIComponent('Ha ocurrido un error en el servidor. Intenta de nuevo.'));
    }
};

// Función para procesar el cierre de sesión
export const cerrarSeccion = (req: Request, res: Response): void => {
    // En un proyecto real:
    // Aquí destruirías la sesión del usuario (ej. req.session.destroy(() => { res.redirect('/') }));
    console.log('Cierre de sesión.');
    res.redirect('/'); // Redirige al usuario a la página de login
};