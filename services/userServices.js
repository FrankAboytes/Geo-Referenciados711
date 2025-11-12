    const User = require('../models/User');

    class UsersService {
    async getAll() {
        return await User.find();
    }

    async getById(id) {
        return await User.findById(id);
    }

    async create(data) {
        const user = new User(data);
        return await user.save();
    }

    async update(id, changes) {
        return await User.findByIdAndUpdate(id, changes, { new: true });
    }

    async delete(id) {
        await User.findByIdAndDelete(id);
        return { id };
    }
    }

    module.exports = new UsersService();