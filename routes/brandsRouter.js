const express = require('express');
// CAMBIO 1: Importar la INSTANCIA del servicio
const service = require('../services/brandsServices');

// CAMBIO 2: Importar el servicio de productos para el borrado en cascada
const productsService = require('../services/productsServices');
const router = express.Router();

// CAMBIO 3: Eliminar la creación de la instancia local
// const service = new BrandsService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado de la marca.
 *           example: 1
 *         name:
 *           type: string
 *           description: El nombre de la marca.
 *           example: "Apple"
 *         logo:
 *           type: string
 *           description: URL del logo de la marca.
 *           example: "https://example.com/logo.png"
 *       required:
 *         - name
 *         - logo
 *     NewBrand:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre de la marca.
 *           example: "Samsung"
 *         logo:
 *           type: string
 *           description: URL del logo de la marca.
 *           example: "https://example.com/logo_samsung.png"
 *       required:
 *         - name
 *         - logo
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Obtener todas las marcas
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Una lista de todas las marcas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */
router.get('/', (req, res) => {
    const brands = service.getAll();
    res.status(200).json(brands);
});

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Obtener una marca por su ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la marca a buscar.
 *     responses:
 *       200:
 *         description: Detalles de la marca encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Brand not found"
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const brand = service.getById(id);
    if (brand) {
        res.status(200).json(brand);
    } else {
        res.status(404).json({ message: 'Brand not found' });
    }
});

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Crear una nueva marca
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBrand'
 *     responses:
 *       201:
 *         description: Marca creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "created"
 *                 data:
 *                   $ref: '#/components/schemas/Brand'
 */
router.post('/', (req, res) => {
    const body = req.body;
    const newBrand = service.create(body);
    res.status(201).json({
        message: 'created',
        data: newBrand
    });
});

/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: Actualizar una marca existente (parcial)
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la marca a actualizar.
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
 *               logo:
 *                 type: string
 *             example:
 *               name: "Apple Inc."
 *     responses:
 *       200:
 *         description: Marca actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "updated"
 *                 data:
 *                   $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Brand not found"
 */
router.patch('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedBrand = service.update(id, body);
        res.status(200).json({
            message: 'updated',
            data: updatedBrand
        });
    } catch (error) {
        // CORREGIDO: Cambiado 444 a 404, que es el estándar para 'Not Found'
        res.status(404).json({ message: error.message });
    }
});

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Eliminar una marca (y sus productos asociados en cascada)
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la marca a eliminar.
 *     responses:
 *       200:
 *         description: Marca y productos asociados eliminados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deleted brand and 5 associated products"
 *                 id:
 *                   type: string
 *                   example: "3"
 *       404:
 *         description: Marca no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Brand not found"
 */
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. Pide al servicio de marcas que elimine la marca.
        const result = service.delete(id);
        
        // 2. Pide al servicio de productos que elimine los productos de esa marca.
        const deletedProductsCount = productsService.deleteByBrandId(id);

        // 3. Envía una respuesta consolidada.
        res.status(200).json({ 
            message: `Deleted brand and ${deletedProductsCount} associated products`,
            id: result.id
        });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;