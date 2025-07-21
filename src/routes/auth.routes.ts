// src/routes/auth.routes.ts
import { Router } from 'express';
import { mostrarLogin, login, cerrarSeccion } from '../controllers/auth.controller';

const router = Router();

// Ruta para mostrar la página de login (GET /)
router.get('/', mostrarLogin);

// Ruta para procesar el envío del formulario de login (POST /login)
router.post('/login', login);

// Ruta para el cierre de sesión (GET /logout)
router.get('/logout', cerrarSeccion);

export default router;