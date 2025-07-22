"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pelicula = void 0;
// src/models/pelicula.model.ts
const sequelize_1 = require("sequelize");
//local
// import { sequelize } from '../config/database'; 
//no local
const database_1 = __importDefault(require("../config/database"));
class Pelicula extends sequelize_1.Model {
}
exports.Pelicula = Pelicula;
Pelicula.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    genre: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    director: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    releaseYear: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    posterUrl: {
        type: new sequelize_1.DataTypes.STRING(255), // String para URL
        allowNull: true, // Permite nulos si no todas las películas tendrán un póster
        defaultValue: '/img/default-movie-poster.png' // Una imagen por defecto si no se proporciona ninguna
    },
}, {
    tableName: 'peliculas', // Asegúrate de que esto coincida con el nombre de tu tabla
    sequelize: // Asegúrate de que esto coincida con el nombre de tu tabla
    database_1.default,
});
//# sourceMappingURL=pelicula.model.js.map