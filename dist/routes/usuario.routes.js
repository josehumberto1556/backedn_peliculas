"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const router = (0, express_1.Router)();
router.get('/', usuario_controller_1.getUsuarios); //ruta mustra todos los usuarios
// NUEVAS RUTAS para el registro de usuarios
router.get('/registro', usuario_controller_1.registro);
router.post('/crear-usuario', usuario_controller_1.crearUsuario);
// RUTAS para Edición de Usuarios
router.get('/editar-usuario/:id', usuario_controller_1.editar);
router.post('/editar-usuario/:id', usuario_controller_1.editarUsuario);
//para Eliminar Usuario
router.post('/eliminar-usuario/:id', usuario_controller_1.eliminarUsuario);
exports.default = router;
//# sourceMappingURL=usuario.routes.js.map