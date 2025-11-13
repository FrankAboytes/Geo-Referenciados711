const express = require('express');
const MoviesServices = require('../services/moviesServices'); 
const service = new MoviesServices(); 
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: El ID único de MongoDB (ObjectId).
 *           example: "60d5f1b9b6e4b30015b1e1a1"
 *         id:
 *           type: string
 *           description: El ID único de MongoDB (ObjectId).
 *           example: "60d5f1b9b6e4b30015b1e1a1"
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
 *           description: El año de lanzamiento.
 *           example: 2010
 *         genre:
 *           type: string
 *           description: El género de la película.
 *           example: "Sci-Fi"
 *         duration:
 *           type: integer
 *           description: Duración en minutos.
 *           example: 148
 *       required:
 *         - title
 *         - director
 *         - year
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Obtener todas las películas
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Una lista de películas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie' 
 */
router.get('/', async (req, res) => {
    try {
        const allMovies = await service.getAll();
        res.json(allMovies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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
 *         description: El ID de la película (ObjectId de MongoDB).
 *         example: "60d5f1b9b6e4b30015b1e1a1"
 *     responses:
 *       200:
 *         description: Detalles de la película.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Película no encontrada.
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await service.findOne(id);
        
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
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
 *             $ref: '#/components/schemas/Movie' 
 *     responses:
 *       201:
 *         description: Película creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */
router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const newMovie = await service.create(body);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ 
            message: error.message, 
            errors: error.errors 
        });
    }
});

/**
 * @swagger
 * /movies/{id}:
 *   patch:
 *     summary: Actualizar una película por su ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la película a actualizar (ObjectId de MongoDB).
 *         example: "60d5f1b9b6e4b30015b1e1a1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie' 
 *     responses:
 *       200:
 *         description: Película actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Película no encontrada.
 */
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedMovie = await service.update(id, body);
        
        if (updatedMovie) {
            res.json(updatedMovie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(400).json({ 
            message: error.message, 
            errors: error.errors 
        });
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
 *         description: El ID de la película a eliminar (ObjectId de MongoDB).
 *         example: "60d5f1b9b6e4b30015b1e1a1"
 *     responses:
 *       200:
 *         description: Película eliminada exitosamente.
 *       404:
 *         description: Película no encontrada.
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await service.delete(id);
        
        if (deletedMovie) {
            res.json({ 
                message: 'Movie deleted successfully', 
                id: deletedMovie._id 
            });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;