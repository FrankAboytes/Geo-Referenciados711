    const Brand = require('../models/Brand');

    class BrandsService {
    async getAll() {
        try {
        const brands = await Brand.find();
        return brands;
        } catch (error) {
        throw new Error(`Error getting brands: ${error.message}`);
        }
    }

    async getById(id) {
        try {
        const brand = await Brand.findById(id);
        if (!brand) {
            throw new Error('Brand not found');
        }
        return brand;
        } catch (error) {
        throw new Error(`Error getting brand: ${error.message}`);
        }
    }

    async create(brandData) {
        try {
        const brand = new Brand(brandData);
        const savedBrand = await brand.save();
        return savedBrand;
        } catch (error) {
        throw new Error(`Error creating brand: ${error.message}`);
        }
    }

    async update(id, updateData) {
        try {
        const brand = await Brand.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!brand) {
            throw new Error('Brand not found');
        }
        
        return brand;
        } catch (error) {
        throw new Error(`Error updating brand: ${error.message}`);
        }
    }

    async delete(id) {
        try {
        const brand = await Brand.findByIdAndDelete(id);
        
        if (!brand) {
            throw new Error('Brand not found');
        }
        
        return brand;
        } catch (error) {
        throw new Error(`Error deleting brand: ${error.message}`);
        }
    }
    }

    module.exports = new BrandsService();