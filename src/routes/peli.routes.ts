import { Router } from 'express';
import {ListadoPeliculas,
         mostrarRegistro
     } from '../controllers/peli.controller';

const router = Router();

// Ruta para mostrar el listado de películas
router.get('/', ListadoPeliculas)

router.get('/nuevo', mostrarRegistro);



export default router;