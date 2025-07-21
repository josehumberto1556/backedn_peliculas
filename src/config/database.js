"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
// src/config/database.ts
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Carga las variables de entorno desde .env
const DB_DIALECT = process.env.DB_DIALECT;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'testdb';
exports.sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false, // Desactiva el logging de SQL en la consola (puedes activarlo para depurar)
    define: {
        freezeTableName: true, // Evita que Sequelize pluralice automáticamente los nombres de las tablas
    }
});
// Función para probar la conexión
const connectDB = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
    }
    catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        process.exit(1); // Sale de la aplicación si no puede conectar
    }
};
exports.connectDB = connectDB;
