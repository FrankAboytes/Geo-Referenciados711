const express = require('express');
const service = require('../services/productsServices');    
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
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
 *         name:
 *           type: string
 *           description: El nombre del producto.
 *           example: "Laptop Pro"
 *         price:
 *           type: integer
 *           description: El precio del producto.
 *           example: 1500
 *         image:
 *           type: string
 *           description: URL de la imagen del producto.
 *           example: "https://example.com/image.jpg"
 *         categoryId:
 *           type: string
 *           description: El ID de la categoría a la que pertenece el producto (ObjectId de MongoDB).
 *           example: "60d5f1b9b6e4b30015b1e1a1"
 *         brandId:
 *           type: string
 *           description: El ID de la marca a la que pertenece el producto (ObjectId de MongoDB).
 *           example: "60d5f1b9b6e4b30015b1e1a1"
 *       required:
 *         - name
 *         - price
 *         - image
 *         - categoryId
 *         - brandId
 *     NewProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre del producto.
 *           example: "Mouse Gamer"
 *         price:
 *           type: integer
 *           description: El precio del producto.
 *           example: 80
 *         image:
 *           type: string
 *           description: URL de la imagen del producto.
 *           example: "https://example.com/mouse.jpg"
 *         categoryId:
 *           type: string
 *           description: El ID de la categoría a la que pertenece el producto (ObjectId de MongoDB).
 *           example: "60d5f1b9b6e4b30015b1e1a1"
 *         brandId:
 *           type: string
 *           description: El ID de la marca a la que pertenece el producto (ObjectId de MongoDB).
 *           example: "60d5f1b9b6e4b30015b1e1a1"
 *       required:
 *         - name
 *         - price
 *         - image
 *         - categoryId
 *         - brandId
 *   tags:
 *     - name: Products
 *       description: API para la gestión de productos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Una lista de todos los productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', async (req, res) => {
    const products = await service.getAll();
    res.status(200).json(products);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del producto a buscar (ObjectId de MongoDB).
 *         example: "60d5f1b9b6e4b30015b1e1a1"
 *     responses:
 *       200:
 *         description: Detalles del producto encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await service.getById(id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProduct'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "created"
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 */
router.post('/', async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
        message: 'created',
        data: newProduct
    });
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualizar un producto existente (parcial)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del producto a actualizar (ObjectId de MongoDB).
 *         example: "60d5f1b9b6e4b30015b1e1a1"
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
 *               price:
 *                 type: integer
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               brandId:
 *                 type: string
 *             example:
 *               name: "Laptop Pro v2"
 *               price: 1550
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "updated"
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 */
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = await service.update(id, body);
        res.json({
            message: 'updated',
            data: product
        });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto por su ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del producto a eliminar (ObjectId de MongoDB).
 *         example: "60d5f1b9b6e4b30015b1e1a1"
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "deleted"
 *                 id:
 *                   type: string
 *                   example: "60d5f1b9b6e4b30015b1e1a1"
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await service.delete(id);
        res.json({
            message: 'deleted',
            id: result.id
        });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;