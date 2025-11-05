const express = require('express');
const service = require('../services/categoriesServices'); // Importa la instancia
const productsService = require('../services/productsServices');
const router = express.Router();
// const service = new CategoriesService(); // Ya no se crea aquí

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado de la categoría.
 *           example: 1
 *         name:
 *           type: string
 *           description: El nombre de la categoría.
 *           example: "Electrónica"
 *         description:
 *           type: string
 *           description: Descripción de la categoría.
 *           example: "Dispositivos y gadgets electrónicos"
 *       required:
 *         - name
 *         - description
 *     NewCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre de la categoría.
 *           example: "Ropa"
 *         description:
 *           type: string
 *           description: Descripción de la categoría.
 *           example: "Prendas de vestir y accesorios"
 *       required:
 *         - name
 *         - description
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Una lista de todas las categorías.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', (req, res) => {
    const categories = service.getAll();
    res.status(200).json(categories);
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener una categoría por su ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la categoría a buscar.
 *     responses:
 *       200:
 *         description: Detalles de la categoría encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const category = service.getById(id);
    if(category) {
        res.status(200).json(category);
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCategory'
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "created"
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 */
router.post('/', (req, res) => {
    const body = req.body;
    const newCategory = service.create(body);
    res.status(201).json({
        message: 'created',
        data: newCategory
    });
});

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Actualizar una categoría existente (parcial)
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la categoría a actualizar.
 *     requestBody:
 *       description: Campos para actualizar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: "Electrónica y Cómputo"
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "updated"
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 */
router.patch('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedCategory = service.update(id, body);
        res.status(200).json({
            message: 'updated',
            data: updatedCategory
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría (y sus productos asociados en cascada)
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la categoría a eliminar.
 *     responses:
 *       200:
 *         description: Categoría y productos asociados eliminados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deleted category and 8 associated products"
 *                 id:
 *                   type: string
 *                   example: "1"
 *       404:
 *         description: Categoría no encontrada o error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 */
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. La ruta le pide al servicio de categorías que elimine la categoría.
        const result = service.delete(id);
        
        // 2. La ruta le pide al servicio de productos que elimine los productos asociados.
        const deletedProductsCount = productsService.deleteByCategoryId(id);

        // 3. La ruta construye y envía la respuesta final al cliente.
        res.status(200).json({ 
            message: `Deleted category and ${deletedProductsCount} associated products`,
            id: result.id
        });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;