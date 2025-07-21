"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Asume que tienes un archivo de configuración de DB
class Usuario extends sequelize_1.Model {
}
exports.Usuario = Usuario;
Usuario.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255), // Suficientemente largo para el hash de bcrypt
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'user', 'editor'),
        defaultValue: 'user',
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    },
}, {
    tableName: 'usuarios',
    sequelize: database_1.sequelize,
    timestamps: true, // Esto maneja created_at y updated_at automáticamente
    underscored: true, // Para usar `created_at` en lugar de `createdAt` en la DB
});
exports.default = Usuario;
//# sourceMappingURL=usuario.model.js.map