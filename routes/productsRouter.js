const express = require('express');
const service = require('../services/productsServices'); // Servicio correcto
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: El ID único del producto (UUID).
 *           example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
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
 *           type: integer
 *           description: El ID de la categoría a la que pertenece el producto.
 *           example: 1
 *         brandId:
 *           type: integer
 *           description: El ID de la marca a la que pertenece el producto.
 *           example: 1
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
 *           type: integer
 *           description: El ID de la categoría a la que pertenece el producto.
 *           example: 1
 *         brandId:
 *           type: integer
 *           description: El ID de la marca a la que pertenece el producto.
 *           example: 2
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
router.get('/', (req, res) => {
  const products = service.getAll();
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
 *           format: uuid
 *         required: true
 *         description: El ID (UUID) del producto a buscar.
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
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.getById(id);
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
router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
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
 *           format: uuid
 *         required: true
 *         description: El ID (UUID) del producto a actualizar.
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
 *                 type: integer
 *               brandId:
 *                 type: integer
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
router.patch('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = service.update(id, body);
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
 *           format: uuid
 *         required: true
 *         description: El ID (UUID) del producto a eliminar.
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
 *                   example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
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
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const result = service.delete(id);
        res.json({
            message: 'deleted',
            ...result
        });
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;