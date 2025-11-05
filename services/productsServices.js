const faker = require("faker");
const categoriesService = require('./categoriesServices');
const brandsService = require('./brandsServices');

class ProductsService {
    constructor() {
        this.products = [];
        this.generate();
    } 

    generate() {
        const limit = 20; 
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price()),
                image: faker.image.imageUrl(),
                categoryId: faker.datatype.number({ min: 1, max: 5 }),
                brandId: faker.datatype.number({ min: 1, max: 5 })
            });
        }
    }

    create(data){
        // VALIDACIÓN: Verificar si categoryId existe
        if (data.categoryId !== undefined) {
            const categoryExists = categoriesService.getById(data.categoryId);
            if (!categoryExists) {
                throw new Error(`Category with id ${data.categoryId} not found`);
            }
        }

        // VALIDACIÓN: Verificar si brandId existe
        if (data.brandId !== undefined) {
            const brandExists = brandsService.getById(data.brandId);
            if (!brandExists) {
                throw new Error(`Brand with id ${data.brandId} not found`);
            }
        }

        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        };
        this.products.push(newProduct);
        return newProduct;
    }

    getAll(){
        return this.products;
    }

    getById(id){
        return this.products.find(item => item.id === id);
    }

    update(id, changes){
        const index = this.products.findIndex(item => item.id === id);
        if(index === -1){
            throw new Error('Product not found');
        }

        // VALIDACIÓN: Verificar si categoryId existe
        if (changes.categoryId !== undefined) {
            const categoryExists = categoriesService.getById(changes.categoryId);
            if (!categoryExists) {
                throw new Error(`Category with id ${changes.categoryId} not found`);
            }
        }

        // VALIDACIÓN: Verificar si brandId existe
        if (changes.brandId !== undefined) {
            const brandExists = brandsService.getById(changes.brandId);
            if (!brandExists) {
                throw new Error(`Brand with id ${changes.brandId} not found`);
            }
        }

        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        };
        return this.products[index];
    }

    delete(id){
        const index = this.products.findIndex(p => p.id == id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.products.splice(index, 1);
        return { id };
    }

    // --- MÉTODOS PARA BORRADO EN CASCADA ---
    deleteByCategoryId(categoryId) {
        const initialCount = this.products.length;
        this.products = this.products.filter(p => p.categoryId != categoryId);
        const finalCount = this.products.length;
        return initialCount - finalCount;
    }

    deleteByBrandId(brandId) {
        const initialCount = this.products.length;
        this.products = this.products.filter(p => p.brandId != brandId);
        const finalCount = this.products.length;
        return initialCount - finalCount;
    }
}

module.exports = new ProductsService();