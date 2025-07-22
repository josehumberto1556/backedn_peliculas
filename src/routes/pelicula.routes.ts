import { Router } from 'express';
import { getPeliculas, 
         getPeliculasJson,
         getPeliculaById,
         mostrarRegistro,
         mostrarEditar,
         crearPelicula,
         editarPelicula,
         eliminarPelicula 
     } from '../controllers/pelicula.controller';

const router = Router();

// Ruta para mostrar el listado de películas
router.get('/', getPeliculasJson);
 // Esta ruta ahora usa getPeliculasJson frotnend
router.get('/:id', getPeliculaById);
router.get('/admin', getPeliculas);
router.get('/nuevo', mostrarRegistro); 
router.get('/editar/:id', mostrarEditar);

// --- Rutas POST (para procesar envíos de formularios) ---
router.post('/crear', crearPelicula);                
router.post('/editar/:id', editarPelicula);          
router.post('/eliminar/:id', eliminarPelicula)


export default router;