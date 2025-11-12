    const Brand = require('../models/Brand');

    class BrandsService {
    async getAll() {
        return await Brand.find();
    }

    async getById(id) {
        return await Brand.findById(id);
    }

    async create(data) {
        const brand = new Brand(data);
        return await brand.save();
    }

    async update(id, changes) {
        return await Brand.findByIdAndUpdate(id, changes, { new: true });
    }

    async delete(id) {
        await Brand.findByIdAndDelete(id);
        return { id };
    }
    }

    module.exports = new BrandsService();