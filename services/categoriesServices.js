const faker = require('faker');

    class CategoriesService {
    constructor() {
        this.categories = [];
        this.generate();
    }

    generate() {
        for (let i = 0; i < 5; i++) {
        this.categories.push({
            id: i + 1,
            name: faker.commerce.department(),
            description: faker.lorem.sentence()
        });
        }
    }

    getAll() {
        return this.categories;
    }

    getById(id) {
        return this.categories.find(c => c.id == id);
    }

    create(data) {
        const newCategory = {
        id: this.categories.length + 1,
        ...data
        };
        this.categories.push(newCategory);
        return newCategory;
    }

    update(id, changes) {
        const index = this.categories.findIndex(c => c.id == id);
        if (index === -1) {
        throw new Error('Category not found');
        }
        const category = this.categories[index];
        this.categories[index] = { ...category, ...changes };
        return this.categories[index];
    }

    delete(id) {
        const index = this.categories.findIndex(c => c.id == id);
        if (index === -1) {
        throw new Error('Category not found');
        }
        this.categories.splice(index, 1);
        return { id };
    }
    }

    // Exporta la instancia, no la clase
    module.exports = new CategoriesService();