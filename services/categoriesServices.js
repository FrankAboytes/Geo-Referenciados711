    const Category = require('../models/Category');

    class CategoriesService {
    async getAll() {
        try {
        const categories = await Category.find();
        return categories;
        } catch (error) {
        throw new Error(`Error getting categories: ${error.message}`);
        }
    }

    async getById(id) {
        try {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
        } catch (error) {
        throw new Error(`Error getting category: ${error.message}`);
        }
    }

    async create(categoryData) {
        try {
        const category = new Category(categoryData);
        const savedCategory = await category.save();
        return savedCategory;
        } catch (error) {
        throw new Error(`Error creating category: ${error.message}`);
        }
    }

    async update(id, updateData) {
        try {
        const category = await Category.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!category) {
            throw new Error('Category not found');
        }
        
        return category;
        } catch (error) {
        throw new Error(`Error updating category: ${error.message}`);
        }
    }

    async delete(id) {
        try {
        const category = await Category.findByIdAndDelete(id);
        
        if (!category) {
            throw new Error('Category not found');
        }
        
        return category;
        } catch (error) {
        throw new Error(`Error deleting category: ${error.message}`);
        }
    }
    }

    module.exports = new CategoriesService();