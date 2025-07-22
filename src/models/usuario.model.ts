import { DataTypes, Model, Optional } from 'sequelize';
//local
// import {sequelize} from '../config/database';
//no local
import sequelize from '../config/database';

interface UsuarioAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'editor';
  created_at?: Date;
  updated_at?: Date;
}

interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  public id!: number;
 
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'user';
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // ... (otros métodos o asociaciones) ...
}

Usuario.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
 
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255), // Suficientemente largo para el hash de bcrypt
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user', 'editor'),
    defaultValue: 'user',
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'usuarios',
  sequelize,
  timestamps: true, // Esto maneja created_at y updated_at automáticamente
  underscored: true, // Para usar `created_at` en lugar de `createdAt` en la DB
});

export default Usuario; 