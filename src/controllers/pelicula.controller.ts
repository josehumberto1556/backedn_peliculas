import { Request, Response } from 'express';
import { Pelicula } from '../models/pelicula.model';
import { Op } from 'sequelize';

// --- NUEVA FUNCIÓN PARA EL FRONTEND REACT (devuelve JSON) ---
export const getPeliculasJson = async (req: Request, res: Response): Promise<void> => {
    try {
        const { searchTitle } = req.query; // El frontend enviará 'searchTitle' como parámetro de consulta
        let whereClause: any = {};

        if (searchTitle) {
            whereClause.title = {
                [Op.like]: `%${searchTitle}%`
            };
        }

        const peliculas = await Pelicula.findAll({ where: whereClause });
        
        console.log('Películas obtenidas de la DB para el Frontend (JSON):', peliculas.length);
    
        // ¡Este controlador devuelve JSON para el frontend!
        res.status(200).json(peliculas); 

    } catch (error: any) {
        console.error('Error al obtener las películas para el Frontend (JSON):', error);
        // Siempre devuelve un JSON de error con un código de estado apropiado
        res.status(500).json({ 
            message: 'Error interno del servidor al cargar las películas.', 
            error: error.message // Opcional: para depuración, no en producción
        });
    }
};

//backend cpanel
export const getPeliculas = async (req: Request, res: Response): Promise<void> => {
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
};

export const getPeliculaById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // 'id' viene de la URL /peliculas/:id
        const pelicula = await Pelicula.findByPk(id);

        if (!pelicula) {
            res.status(404).json({ message: 'Película no encontrada.' });
            return;
        }

        console.log(`Película ID ${id} obtenida para el Frontend (JSON).`);
        res.status(200).json(pelicula);

    } catch (error: any) {
        console.error(`Error al obtener película por ID ${req.params.id} para el Frontend (JSON):`, error);
        res.status(500).json({ 
            message: 'Error interno del servidor al cargar los detalles de la película.',
            error: error.message
        });
    }
};

export const mostrarRegistro = (req: Request, res: Response): void => {
     try {
        res.render('registro_peli', { title: 'Registrar Nueva Película' });
    } catch (error: any) {
        console.error('Error rendering movie registration form:', error);
        res.status(500).send({ message: 'Error loading movie registration form', error: error.message });
    }
}

export const mostrarEditar = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const pelicula = await Pelicula.findByPk(id); // Necesitamos cargar el usuario para pre-llenar el formulario

        if (!pelicula) {
            res.status(404).send('Usuario no encontrado');
            return;
        }
        res.render('editar-pelicula', { title: 'Editar Pelicula', pelicula: pelicula });
    } catch (error: any) {
        console.error('Error rendering edit form:', error);
        res.status(500).send({ message: 'Error loading edit form', error: error.message });
    }
}

export const crearPelicula = async (req: Request, res: Response): Promise<void> => {
    try {
        const { titulo, director,genero,anio,poster } = req.body; // <--- Añade posterUrl aquí
        let title=titulo;
        let genre=genero;
        let releaseYear=anio;
        let posterUrl=poster
        if (!title || !genre || !director || !releaseYear || !posterUrl) {
          return res.redirect('/peli/nuevo?errorMessage=' + encodeURIComponent('Todos los campos obligatorios deben ser llenados.')); 
         }

        const newPelicula = await Pelicula.create({
            title,
            genre,
            director,
            releaseYear,
            posterUrl: posterUrl || null // Pasa posterUrl, permite null si no se proporciona
        });

        console.log('Película registrada con éxito:', newPelicula.toJSON());
        res.redirect('/peli?successMessage=' + encodeURIComponent('Película registrada con éxito.'));
    } catch (error: any) {
        console.error('Error al registrar película:', error);
        res.status(500).send('Error al registrar la película.');
    }
};

export const editarPelicula = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { titulo,director,anio,genero, poster } = req.body; // <--- Añade posterUrl aquí

        const pelicula = await Pelicula.findByPk(id);

        if (!pelicula) {
            const errorMessage = encodeURIComponent('La película que intentas actualizar no fue encontrada.');
            return res.redirect(`/peli?errorMessage=${errorMessage}`);
        }

        // Actualiza los campos de la película
        pelicula.title =titulo;
        pelicula.genre = genero;
        pelicula.director = director;
        pelicula.releaseYear =anio;
        pelicula.posterUrl = poster || null; // Actualiza posterUrl, permite null

        await pelicula.save();

        console.log('Película actualizada con éxito:', pelicula.toJSON());
        res.redirect('/peli?successMessage=' + encodeURIComponent('Película actualizada con éxito.'));
    } catch (error: any) {
        console.error('Error al actualizar película:', error);
        res.status(500).send('Error al actualizar la película.');
    }
};



export const eliminarPelicula = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Obtiene el ID de la película de la URL

        const pelicula = await Pelicula.findByPk(id); // Busca la película por su ID

        if (!pelicula) {
            res.status(404).send('Película no encontrada para eliminar.');
            return;
        }

        await pelicula.destroy(); // Elimina la película de la base de datos

        console.log(`Película con ID ${id} eliminada exitosamente.`);
        res.redirect('/peli?successMessage='+encodeURIComponent('Pelicula eliminada con exito.')); // Redirige de vuelta al listado de películas
    } catch (error: any) {
        console.error('Error al eliminar la película:', error);
        res.status(500).send({ message: 'Error al eliminar la película', error: error.message });
    }
};