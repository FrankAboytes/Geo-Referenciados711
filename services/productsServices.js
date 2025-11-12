    const Product = require('../models/Products');
    const Category = require('../models/Category');
    const Brand = require('../models/Brand');

    class ProductsService {
    async getAll() {
        return await Product.find()
        .populate('categoryId')
        .populate('brandId');
    }

    async getById(id) {
        return await Product.findById(id)
        .populate('categoryId')
        .populate('brandId');
    }

    async create(data) {
        // Validar que la categoría existe
        const categoryExists = await Category.findById(data.categoryId);
        if (!categoryExists) {
        throw new Error(`Category with id ${data.categoryId} not found`);
        }

        // Validar que la marca existe
        const brandExists = await Brand.findById(data.brandId);
        if (!brandExists) {
        throw new Error(`Brand with id ${data.brandId} not found`);
        }

        const product = new Product(data);
        return await product.save();
    }

    async update(id, changes) {
        // Validar que la categoría existe si se está actualizando
        if (changes.categoryId) {
        const categoryExists = await Category.findById(changes.categoryId);
        if (!categoryExists) {
            throw new Error(`Category with id ${changes.categoryId} not found`);
        }
        }

        // Validar que la marca existe si se está actualizando
        if (changes.brandId) {
        const brandExists = await Brand.findById(changes.brandId);
        if (!brandExists) {
            throw new Error(`Brand with id ${changes.brandId} not found`);
        }
        }

        return await Product.findByIdAndUpdate(id, changes, { new: true })
        .populate('categoryId')
        .populate('brandId');
    }

    async delete(id) {
        await Product.findByIdAndDelete(id);
        return { id };
    }

    // Métodos para borrado en cascada
    async deleteByCategoryId(categoryId) {
        const result = await Product.deleteMany({ categoryId });
        return result.deletedCount;
    }

    async deleteByBrandId(brandId) {
        const result = await Product.deleteMany({ brandId });
        return result.deletedCount;
    }
    }

    module.exports = new ProductsService();