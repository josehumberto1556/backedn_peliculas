// src/models/usuario.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// ... (tus interfaces y definición de clase Usuario) ...

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: { // Propiedad del modelo en camelCase
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {  // Propiedad del modelo en camelCase
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'usuarios', // Asegúrate de que coincida con el nombre de la tabla en la migración
    timestamps: true,
    underscored: true,     // ¡Esto es crucial para que Sequelize mapee a snake_case!
  }
);

export { Usuario };