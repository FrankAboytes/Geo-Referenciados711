    const User = require('../models/User');

    class UsersService {
    async getAll() {
        try {
        const users = await User.find();
        return users;
        } catch (error) {
        throw new Error(`Error getting users: ${error.message}`);
        }
    }

    async getById(id) {
        try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
        } catch (error) {
        throw new Error(`Error getting user: ${error.message}`);
        }
    }

    async create(userData) {
        try {
        const user = new User(userData);
        const savedUser = await user.save();
        return savedUser;
        } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async update(id, updateData) {
        try {
        const user = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!user) {
            throw new Error('User not found');
        }
        
        return user;
        } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async delete(id) {
        try {
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            throw new Error('User not found');
        }
        
        return user;
        } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
        }
    }
    }

    module.exports = new UsersService();