"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pelicula_controller_1 = require("../controllers/pelicula.controller");
const router = (0, express_1.Router)();
// Ruta para mostrar el listado de películas
router.get('/', pelicula_controller_1.getPeliculasJson); // Esta ruta ahora usa getPeliculasJson frotnend
router.get('/:id', pelicula_controller_1.getPeliculaById);
router.get('/admin', pelicula_controller_1.getPeliculas);
router.get('/nuevo', pelicula_controller_1.mostrarRegistro);
router.get('/editar/:id', pelicula_controller_1.mostrarEditar);
// --- Rutas POST (para procesar envíos de formularios) ---
router.post('/crear', pelicula_controller_1.crearPelicula);
router.post('/editar/:id', pelicula_controller_1.editarPelicula);
router.post('/eliminar/:id', pelicula_controller_1.eliminarPelicula);
exports.default = router;
//# sourceMappingURL=pelicula.routes.js.map