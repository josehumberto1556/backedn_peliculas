"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
//local
//import { connectDB } from './config/database'; 
//import connectDB  from './config/database'; 
//no local
const database_1 = __importDefault(require("./config/database"));
// --- Importar todas las rutas y el middleware ---
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const pelicula_routes_1 = __importDefault(require("./routes/pelicula.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const peli_routes_1 = __importDefault(require("./routes/peli.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// 1. MIDDLEWARE DE REGISTRO (MORGAN)
app.use((0, morgan_1.default)('dev'));
// 2. MIDDLEWARE DE CORS
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173'], // Reemplaza con la URL de tu frontend(s)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Métodos HTTP que tu API soporta
    //allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras que tu frontend puede enviar
    // credentials: true // Si vas a usar cookies o cabeceras de autorización
}));
// 3. MIDDLEWARE PARA PARSEAR EL CUERPO DE LAS PETICIO
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.json()); // Si usas APIs JSON
app.use(express_1.default.urlencoded({ extended: true })); // ¡Este es CLAVE para formularios HTML!
// 4. CONFIGURACIÓN DE VISTAS (EJS) Y ARCHIVOS ESTÁTICOS
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
// 5. MIDDLEWARE DE AUTENTICACIÓN (GLOBAL)
// app.use(isAuthenticated);
app.get('/check-connection', (req, res) => {
    console.log('¡Frontend solicitó verificación de conexión!'); // Mensaje en la consola del backend
    res.json({ message: 'Conexión con el frontend exitosa. ¡Hola desde el backend!' });
});
// 6. DEFINICIÓN DE RUTAS
//ruta autentication
// app.use('/',(req, res, next) => {
//     // Establece el código de estado HTTP a 404
//     console.log("hola") // Renderiza la vista '404.ejs'
// });
app.use('/', auth_routes_1.default);
// ruta usuarios
app.use('/usuarios', usuario_routes_1.default);
//ruta pelicula
app.use('/peliculas', pelicula_routes_1.default);
app.use('/peli', peli_routes_1.default);
// 7. MIDDLEWARE DE MANEJO DE ERRORES (404)
app.use((req, res, next) => {
    // Establece el código de estado HTTP a 404
    res.status(404).render('404'); // Renderiza la vista '404.ejs'
});
const startServer = async () => {
    //await connectDB();local
    //no local
    try {
        await database_1.default.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV}`);
            console.log('Backend listo para recibir solicitudes del frontend.');
        });
    }
    catch (error) {
        console.error('❌ Error al conectar a la base de datos o iniciar el servidor:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map