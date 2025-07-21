"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// Ruta para mostrar la página de login (GET /)
router.get('/', auth_controller_1.mostrarLogin);
// Ruta para procesar el envío del formulario de login (POST /login)
router.post('/login', auth_controller_1.login);
// Ruta para el cierre de sesión (GET /logout)
router.get('/logout', auth_controller_1.cerrarSeccion);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map