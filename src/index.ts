// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

//local
//import { connectDB } from './config/database'; 
//import connectDB  from './config/database'; 
//no local
import sequelize  from './config/database'; 
// --- Importar todas las rutas y el middleware ---
import usuarioRoutes from './routes/usuario.routes'; 
import peliculaRoutes from './routes/pelicula.routes';
import authRoutes     from './routes/auth.routes';
import peliRoutes     from './routes/peli.routes';
import { isAuthenticated } from './middlewares/authMiddleware'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 1. MIDDLEWARE DE REGISTRO (MORGAN)
app.use(morgan('dev'));

// 2. MIDDLEWARE DE CORS

app.use(cors({
  origin: ['https://frontend-peliculas-gsaf.onrender.com/'],
  //local
  //origin: ['http://localhost:5173'], // Reemplaza con la URL de tu frontend(s)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Métodos HTTP que tu API soporta
  //allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras que tu frontend puede enviar
 // credentials: true // Si vas a usar cookies o cabeceras de autorización
}));

// 3. MIDDLEWARE PARA PARSEAR EL CUERPO DE LAS PETICIO
app.use(express.static(path.join(__dirname, '../public')))

app.use(express.json()); // Si usas APIs JSON
app.use(express.urlencoded({ extended: true })); // ¡Este es CLAVE para formularios HTML!


// 4. CONFIGURACIÓN DE VISTAS (EJS) Y ARCHIVOS ESTÁTICOS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// 5. MIDDLEWARE DE AUTENTICACIÓN (GLOBAL)
// app.use(isAuthenticated);
app.get('/check-connection', (req, res) => {
    console.log('¡Frontend solicitó verificación de conexión!'); // Mensaje en la consola del backend
    res.json({ message: 'Conexión con el frontend exitosa. ¡Hola desde el backend!' });
})
// 6. DEFINICIÓN DE RUTAS
//ruta autentication
// app.use('/',(req, res, next) => {
//     // Establece el código de estado HTTP a 404
//     console.log("hola") // Renderiza la vista '404.ejs'
// });

app.use('/', authRoutes);
// ruta usuarios
app.use('/usuarios', usuarioRoutes)
//ruta pelicula
app.use('/peliculas', peliculaRoutes)
app.use('/peli', peliRoutes)

// 7. MIDDLEWARE DE MANEJO DE ERRORES (404)
app.use((req, res, next) => {
    // Establece el código de estado HTTP a 404
    res.status(404).render('404'); // Renderiza la vista '404.ejs'
});

const startServer = async () => {
  //await connectDB();local
  //no local
   try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log('Backend listo para recibir solicitudes del frontend.');
    });
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos o iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();