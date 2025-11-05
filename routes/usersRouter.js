const express = require('express');
const service = require('../services/userServices'); // Importa la instancia
const router = express.Router();
// const service = new UsersService(); // Ya no se crea aquí

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado del usuario.
 *           example: 1
 *         name:
 *           type: string
 *           description: El nombre del usuario.
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: El email del usuario.
 *           example: "john.doe@example.com"
 *         avatar:
 *           type: string
 *           description: URL del avatar del usuario.
 *           example: "https://example.com/avatar.png"
 *       required:
 *         - name
 *         - email
 *     NewUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre del usuario.
 *           example: "Jane Doe"
 *         email:
 *           type: string
 *           description: El email del usuario.
 *           example: "jane.doe@example.com"
 *         avatar:
 *           type: string
 *           description: URL del avatar del usuario.
 *           example: "https://example.com/avatar.png"
 *       required:
 *         - name
 *         - email
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Una lista de todos los usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', (req, res) => {
  const users = service.getAll();
  res.status(200).json(users);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario a buscar.
 *     responses:
 *       200:
 *         description: Detalles del usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.getById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: Usuario creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "created"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 */
router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json({
    message: 'created',
    data: newUser
  });
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualizar un usuario existente (parcial)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario a actualizar.
 *     requestBody:
 *       description: Campos para actualizar. Solo se actualizarán los campos enviados.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               avatar:
 *                 type: string
 *             example:
 *               name: "John A. Doe"
 *               email: "john.new@example.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "updated"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = service.update(id, body);
    res.status(200).json({
      message: 'updated',
      data: updatedUser
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario a eliminar.
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
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
 *                   example: "1"
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const result = service.delete(id);
    res.status(200).json({
      message: 'deleted',
      ...result
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;