import { Request, Response } from 'express';
import { Pelicula } from '../models/pelicula.model';
import { Op } from 'sequelize';

export const ListadoPeliculas=async (req: Request, res: Response): Promise<void> =>
{
     try {
        const { searchTitle, successMessage, errorMessage } = req.query; // 'searchTitle' es el nombre del parámetro en la URL
        let whereClause: any = {};

        if (searchTitle) {
            // ¡AQUÍ ESTÁ EL CAMBIO CLAVE!
            // Usa 'title' si así se llama la columna en tu tabla 'Peliculas'
            whereClause.title = {
                [Op.like]: `%${searchTitle}%`
            };
   
        }

        const peliculas = await Pelicula.findAll({ where: whereClause });
        console.log('Películas obtenidas de la DB:', peliculas.length);

        res.render('peliculas', {
            title: 'Gestión de Películas',
            peliculas: peliculas,
            queryTitle: searchTitle || '',
            successMessage: successMessage || undefined,
            errorMessage: errorMessage || undefined
        });
    } catch (error: any) {
        console.error('Error al obtener las películas para la vista:', error);
       
        const genericErrorMessage = encodeURIComponent('Error al cargar la lista de películas.');
        ///res.redirect(`/peliculas/admin?errorMessage=${genericErrorMessage}`);
       res.status(500).send('Error interno del servidor al cargar las películas. Revisa los logs del backend.');
        // req.flash('error', 'Error al cargar la lista de películas.');
        // res.redirect('/peliculas');
    }
}

export const mostrarRegistro = (req: Request, res: Response): void => {
     try {
        res.render('registro_peli', { title: 'Registrar Nueva Película' });
    } catch (error: any) {
        console.error('Error rendering movie registration form:', error);
        res.status(500).send({ message: 'Error loading movie registration form', error: error.message });
    }
}
