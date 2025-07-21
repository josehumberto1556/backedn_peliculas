// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// Middleware de autenticación simple (TEMPORAL: no usa sesiones reales aún)
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // Aquí es donde normalmente verificarías si hay una sesión activa,
    // un token JWT válido, o si el usuario está realmente logueado.

    // Por ahora, simularemos un usuario "autenticado" si la URL no es el login o el CSS.
    // Esto es muy básico y debe ser reemplazado por un sistema de sesión real.
    // Si no fuera el login, y para propósitos de prueba:
    
    // REDIRECCIÓN DIRECTA AL LOGIN SI NO SE ESTÁ INTENTANDO LOGUEAR O ACCEDIENDO A RECURSOS ESTÁTICOS
    // Para rutas que requieren autenticación, si la solicitud no proviene de un POST de login
    // y no está ya en la página de login, redirigimos.

    // NOTA: Esta lógica es para DEMOSTRAR la redirección.
    // Cuando implementes sesiones (con express-session), la lógica será:
    // if (req.session && req.session.userId) { next(); } else { res.redirect('/'); }

    // Si la ruta es el login, el post de login, logout o un archivo estático, déjalo pasar.
    if (req.path === '/' || req.path === '/login' || req.path === '/logout' || req.path.startsWith('/css/') || req.path.startsWith('/img/') || req.path.startsWith('/js/')) {
        return next();
    }

    // Para cualquier otra ruta, si no hay una "sesión" (simulada por ahora), redirige al login.
    // IMPORTANTE: Esto es una SIMULACIÓN. No hay una sesión real manejándose aún.
    // Verás que te redirige constantemente porque no hay estado de "logueado".
    // Esto se solucionará cuando integremos 'express-session'.
    console.log(`Acceso denegado a ${req.path}. Redirigiendo a login.`);
    return res.redirect('/');
};