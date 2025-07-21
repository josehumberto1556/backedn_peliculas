"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuarios = void 0;
const usuario_model_1 = require("../models/usuario.model"); // Import the User model
// Get todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const users = await usuario_model_1.Usuario.findAll();
        console.log("Listado de Usuarios");
        console.table(users);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};
exports.getUsuarios = getUsuarios;
