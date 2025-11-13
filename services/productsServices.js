    const Product = require('../models/Product');

    class ProductsService {
    async getAll() {
        try {
        const products = await Product.find()
            .populate('categoryId')
            .populate('brandId');
        return products;
        } catch (error) {
        throw new Error(`Error getting products: ${error.message}`);
        }
    }

    async getById(id) {
        try {
        const product = await Product.findById(id)
            .populate('categoryId')
            .populate('brandId');
        
        if (!product) {
            throw new Error('Product not found');
        }
        
        return product;
        } catch (error) {
        throw new Error(`Error getting product: ${error.message}`);
        }
    }

    async create(productData) {
        try {
        const product = new Product(productData);
        const savedProduct = await product.save();
        
        // Populate para obtener los datos completos
        const populatedProduct = await Product.findById(savedProduct._id)
            .populate('categoryId')
            .populate('brandId');
        
        return populatedProduct;
        } catch (error) {
        throw new Error(`Error creating product: ${error.message}`);
        }
    }

    async update(id, updateData) {
        try {
        const product = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('categoryId')
        .populate('brandId');
        
        if (!product) {
            throw new Error('Product not found');
        }
        
        return product;
        } catch (error) {
        throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async delete(id) {
        try {
        const product = await Product.findByIdAndDelete(id);
        
        if (!product) {
            throw new Error('Product not found');
        }
        
        return product;
        } catch (error) {
        throw new Error(`Error deleting product: ${error.message}`);
        }
    }

    async deleteByCategoryId(categoryId) {
        try {
        const result = await Product.deleteMany({ categoryId });
        return result.deletedCount;
        } catch (error) {
        throw new Error(`Error deleting products by category: ${error.message}`);
        }
    }

    async deleteByBrandId(brandId) {
        try {
        const result = await Product.deleteMany({ brandId });
        return result.deletedCount;
        } catch (error) {
        throw new Error(`Error deleting products by brand: ${error.message}`);
        }
    }
    }

    module.exports = new ProductsService();