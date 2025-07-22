// src/models/pelicula.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
//local
// import { sequelize } from '../config/database'; 
//no local
import  sequelize  from '../config/database'; 

interface PeliculaAttributes {
    id: number;
    title: string;
    genre: string;
    director: string;
    releaseYear: number;
    posterUrl: string; // Añade este campo
    createdAt?: Date;
    updatedAt?: Date;
}

// Algunos campos son opcionales al crear un registro
interface PeliculaCreationAttributes extends Optional<PeliculaAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Pelicula extends Model<PeliculaAttributes, PeliculaCreationAttributes> implements PeliculaAttributes {
    public id!: number;
    public title!: string;
    public genre!: string;
    public director!: string;
    public releaseYear!: number;
    public posterUrl!: string; 

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Pelicula.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        genre: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        director: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        releaseYear: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        posterUrl: { // Define la nueva columna
            type: new DataTypes.STRING(255), // String para URL
            allowNull: true, // Permite nulos si no todas las películas tendrán un póster
            defaultValue: '/img/default-movie-poster.png' // Una imagen por defecto si no se proporciona ninguna
        },
    },
    {
        tableName: 'peliculas', // Asegúrate de que esto coincida con el nombre de tu tabla
        sequelize,
    }
);

export { Pelicula };