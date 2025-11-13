    // services/productsServices.js

    // const { faker } = require('@faker-js/faker'); // <-- ELIMINA FAKER
    const Product = require('../models/Product'); // <-- IMPORTA TU MODELO

    class ProductsServices {

    // constructor() {} // <-- YA NO SE NECESITA EL CONSTRUCTOR DE FAKER

    async create(data) {
        // 'data' es el 'req.body' que viene de la ruta
        const newProduct = new Product(data);
        await newProduct.save(); // <-- ¡AQUÍ ES DONDE GUARDA EN MONGODB!
        return newProduct;
    }

    async find() {
        return await Product.find(); // <-- Busca en la BD
    }

    async findOne(id) {
        return await Product.findById(id); // <-- Busca por ID en la BD
    }

    async update(id, changes) {
        return await Product.findByIdAndUpdate(id, changes, { new: true }); // <-- Actualiza en la BD
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id); // <-- Borra de la BD
    }
    }

    module.exports = ProductsServices;