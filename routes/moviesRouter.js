const express = require('express');

// 1. Importa la CLASE del nuevo servicio
const MoviesServices = require('../services/moviesServices'); 

// 2. Crea la INSTANCIA del servicio
const service = new MoviesServices(); 

const router = express.Router();

// --- SE ELIMINA EL ARRAY ESTÁTICO 'let movies = [...]' ---

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
        const allMovies = await service.find();
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
 *         description: El ID de la película.
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
        // Manejo de errores (como los de validación de Mongoose)
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
 *         description: El ID de la película a actualizar.
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
 *         description: El ID de la película a eliminar.
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