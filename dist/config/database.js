"use strict";
// // src/config/database.ts
// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config(); // Carga las variables de entorno desde .env
// const DB_DIALECT = process.env.DB_DIALECT as 'mysql' 
// const DB_HOST = process.env.DB_HOST || 'localhost';
// const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
// const DB_USER = process.env.DB_USER || 'root';
// const DB_PASS = process.env.DB_PASS || '';
// const DB_NAME = process.env.DB_NAME || 'testdb';
// export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//   host: DB_HOST,
//   port: DB_PORT,
//   dialect: DB_DIALECT,
//   logging: false, // Desactiva el logging de SQL en la consola (puedes activarlo para depurar)
//   define: {
//     freezeTableName: true, // Evita que Sequelize pluralice automáticamente los nombres de las tablas
//   }
// });
// // Función para probar la conexión
// export const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Conexión a la base de datos establecida correctamente.');
//   } catch (error) {
//     console.error('No se pudo conectar a la base de datos:', error);
//     process.exit(1); // Sale de la aplicación si no puede conectar
//   }
// };
// src/config/database.ts (ejemplo, menos recomendado)
// src/config/database.ts
const sequelize_1 = require("sequelize");
const dotenv = __importStar(require("dotenv")); // <--- ¡Esta es la línea que faltaba!
const fs = __importStar(require("fs")); // Necesario para leer el certificado CA
dotenv.config(); // Carga las variables del archivo .env
const sequelize = new sequelize_1.Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync(process.env.DB_CA_CERT_PATH),
            rejectUnauthorized: true
        }
    },
    logging: false,
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map