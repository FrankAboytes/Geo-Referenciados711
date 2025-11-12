    const Category = require('../models/Category');

    class CategoriesService {
    async getAll() {
        return await Category.find();
    }

    async getById(id) {
        return await Category.findById(id);
    }

    async create(data) {
        const category = new Category(data);
        return await category.save();
    }

    async update(id, changes) {
        return await Category.findByIdAndUpdate(id, changes, { new: true });
    }

    async delete(id) {
        await Category.findByIdAndDelete(id);
        return { id };
    }
    }

    module.exports = new CategoriesService();