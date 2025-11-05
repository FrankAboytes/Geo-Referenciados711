const express = require('express');
const router = express.Router();

let movies = [
    { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 , category: "Sci-Fi" },
    { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999 , category: "Sci-Fi"},
    { id: 3, title: "Interstellar", director: "Christopher Nolan", year: 2014 , category: "Sci-Fi" },
    { id: 4, title: "The Godfather", director: "Francis Ford Coppola", year: 1972 , category: "Crime" },
    { id: 5, title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994 , category: "Crime" },
    { id: 6, title: "The Dark Knight", director: "Christopher Nolan", year: 2008 , category: "Action" },
    { id: 7, title: "Forrest Gump", director: "Robert Zemeckis", year: 1994 , category: "Drama" },
    { id: 8, title: "The Shawshank Redemption", director: "Frank Darabont", year: 1994 , category: "Drama" },
    { id: 9, title: "Fight Club", director: "David Fincher", year: 1999 , category: "Drama" },
    { id: 10, title: "The Lord of the Rings: The Return of the King", director: "Peter Jackson", year: 2003 , category: "Fantasy" },
    { id: 11, title: "The Avengers", director: "Joss Whedon", year: 2012 , category: "Action" },
    { id: 12, title: "Gladiator", director: "Ridley Scott", year: 2000 , category: "Action" },
    { id: 13, title: "Titanic", director: "James Cameron", year: 1997 , category: "Romance" },
    { id: 14, title: "Avatar", director: "James Cameron", year: 2009 , category: "Sci-Fi" },
    { id: 15, title: "The Lion King", director: "Roger Allers and Rob Minkoff", year: 1994 , category: "Animation" },
    { id: 16, title: "Jurassic Park", director: "Steven Spielberg", year: 1993 , category: "Sci-Fi" },
    { id: 17, title: "The Silence of the Lambs", director: "Jonathan Demme", year: 1991 , category: "Thriller" },
    { id: 18, title: "Saving Private Ryan", director: "Steven Spielberg", year: 1998 , category: "War" },
    { id: 19, title: "Braveheart", director: "Mel Gibson", year: 1995 , category: "War" },
    { id: 20, title: "Schindler's List", director: "Steven Spielberg", year: 1993 , category: "History" },
    { id: 21, title: "The Departed", director: "Martin Scorsese", year: 2006 , category: "Crime" },
    { id: 22, title: "Whiplash", director: "Damien Chazelle", year: 2014 , category: "Drama" },

];

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado de la película.
 *           example: 1
 *         title:
 *           type: string
 *           description: El título de la película.
 *           example: "Inception"
 *         director:
 *           type: string
 *           description: El director de la película.
 *           example: "Christopher Nolan"
 *         year:
 *           type: integer
 *           description: Año de estreno.
 *           example: 2010
 *         category:
 *           type: string
 *           description: Género de la película.
 *           example: "Sci-Fi"
 *       required:
 *         - title
 *         - director
 *         - year
 *         - category
 *     NewMovie:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "The Matrix"
 *         director:
 *           type: string
 *           example: "The Wachowskis"
 *         year:
 *           type: integer
 *           example: 1999
 *         category:
 *           type: string
 *           example: "Sci-Fi"
 *       required:
 *         - title
 *         - director
 *         - year
 *         - category
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Obtener todas las películas
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Una lista de todas las películas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get('/', (req, res) => {
    res.json(movies);
});

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Obtener una película por su ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la película a buscar.
 *     responses:
 *       200:
 *         description: Detalles de la película encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Película no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie not found"
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(m => m.id == id); // Comparación flexible
    if (movie) {
        res.json(movie);
    }else {
        res.status(404).json({ message: 'Movie not found' });
    }
}); 

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Crear una nueva película
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewMovie'
 *     responses:
 *       201:
 *         description: Película creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "created"
 *                 data:
 *                   $ref: '#/components/schemas/Movie'
 */
router.post('/', (req, res) => {
    const { title, director, year, category } = req.body;
    const newMovie = {
        id: movies.length + 1,
        title,
        director,
        year,
        category
    };
    movies.push(newMovie);
    res.status(201).json({ // ✅ 201 Created
        message: 'created',
        data: newMovie
    });
});


/**
 * @swagger
 * /movies/{id}:
 *   patch:
 *     summary: Actualizar una película existente (parcial)
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la película a actualizar.
 *     requestBody:
 *       description: Campos para actualizar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               director:
 *                 type: string
 *               year:
 *                 type: integer
 *               category:
 *                 type: string
 *             example:
 *               title: "Inception v2"
 *               year: 2011
 *     responses:
 *       200:
 *         description: Película actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Película no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie not found"
 */
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, category } = req.body;
    const movie = movies.find(m => m.id == id); // Corrección: 'movies.find'
    if (movie) {
        if (title) movie.title = title;
        if (director) movie.director = director;
        if (year) movie.year = year;
        if (category) movie.category = category;
        res.json({
            message: 'updated',
            data: movie
        });
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Eliminar una película por su ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la película a eliminar.
 *     responses:
 *       200:
 *         description: Película eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "deleted"
 *                 id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Película no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Movie not found"
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(m => m.id == id);
    if (movieIndex !== -1) {
        movies.splice(movieIndex, 1);
        res.json({ 
        message: 'deleted',
        id: parseInt(id) // Devolver el ID como número
        });
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// El router.get('/') duplicado al final se eliminó.

module.exports = router;