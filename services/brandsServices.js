const faker = require('faker');

    class BrandsService {
    constructor() {
        this.brands = [];
        this.generate();
    }

    generate() {
        for (let i = 0; i < 5; i++) {
        this.brands.push({
            id: i + 1,
            name: faker.company.companyName(),
            logo: faker.image.business()
        });
        }
    }

    getAll() {
        return this.brands;
    }

    getById(id) {
        return this.brands.find(b => b.id == id);
    }

    create(data) {
        const newBrand = {
        id: this.brands.length + 1,
        ...data
        };
        this.brands.push(newBrand);
        return newBrand;
    }

    update(id, changes) {
        const index = this.brands.findIndex(b => b.id == id);
        if (index === -1) {
        throw new Error('Brand not found');
        }
        const brand = this.brands[index];
        this.brands[index] = { ...brand, ...changes };
        return this.brands[index];
    }

    delete(id) {
        const index = this.brands.findIndex(b => b.id == id);
        if (index === -1) {
        throw new Error('Brand not found');
        }
        this.brands.splice(index, 1);
        return { id };
    }
    }

    // Exporta la instancia, no la clase
    module.exports = new BrandsService();