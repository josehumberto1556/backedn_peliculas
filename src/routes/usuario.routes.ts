import { Router } from 'express';
import {
          getUsuarios,
          registro, 
          crearUsuario,
          editar,
          editarUsuario,
          eliminarUsuario
        } from '../controllers/usuario.controller';

const router = Router();

router.get('/', getUsuarios); //ruta mustra todos los usuarios
// NUEVAS RUTAS para el registro de usuarios
router.get('/registro',registro); 
router.post('/crear-usuario',crearUsuario);

// RUTAS para Edición de Usuarios
router.get('/editar-usuario/:id', editar); 
router.post('/editar-usuario/:id', editarUsuario);   

//para Eliminar Usuario
router.post('/eliminar-usuario/:id', eliminarUsuario)

export default router;