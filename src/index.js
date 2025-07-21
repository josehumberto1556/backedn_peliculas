"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database"); // Only need connectDB here
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes")); // Import your user routes!
// import peliculaRoutes from './routes/pelicula.routes'; // Uncomment if you also have movie routes
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Welcome to the API with TypeScript, Express, and Sequelize!');
});
// Use your user routes!
// All routes defined in usuarioRoutes will start with /api/users
app.use('/api/usuarios', usuario_routes_1.default);
// Uncomment and use if you have movie routes
// app.use('/api/movies', peliculaRoutes);
const startServer = async () => {
    await (0, database_1.connectDB)(); // Connect to the database before starting the server
    // IMPORTANT: In production, do NOT use `sequelize.sync()`. Use migrations instead.
    // `sequelize.sync({ force: false })` can be used in development to auto-create tables
    // if they don't exist based on your models, but migrations are the preferred way
    // to manage schema changes in a version-controlled manner.
    // await sequelize.sync({ force: false });
    // console.log('Models synchronized with the database (if sync was enabled).');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    });
};
startServer();
