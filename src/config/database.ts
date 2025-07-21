// src/config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde .env

const DB_DIALECT = process.env.DB_DIALECT as 'mysql' 
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'testdb';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false, // Desactiva el logging de SQL en la consola (puedes activarlo para depurar)
  define: {
    freezeTableName: true, // Evita que Sequelize pluralice automáticamente los nombres de las tablas
  }
});

// Función para probar la conexión
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1); // Sale de la aplicación si no puede conectar
  }
};