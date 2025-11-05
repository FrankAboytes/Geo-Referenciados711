const faker = require("faker");

class ProductsService {
    constructor() {
        this.products = [];
        this.generate();
    } 

    generate() {
        // Usamos una cantidad más pequeña para que sea más fácil de probar la cascada
        const limit = 20; 
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price()),
                image: faker.image.imageUrl(),
                // Asociamos a las categorías y marcas que creamos (IDs 1 a 5)
                categoryId: faker.datatype.number({ min: 1, max: 5 }),
                brandId: faker.datatype.number({ min: 1, max: 5 })
            });
        }
    }

    create(data){
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

    // --- NUEVOS MÉTODOS PARA BORRADO EN CASCADA ---
    deleteByCategoryId(categoryId) {
        const initialCount = this.products.length;
        // Filtramos, manteniendo solo los productos que NO coinciden con el categoryId
        this.products = this.products.filter(p => p.categoryId != categoryId);
        const finalCount = this.products.length;
        // Retornamos cuántos productos se borraron
        return initialCount - finalCount;
    }

    deleteByBrandId(brandId) {
        const initialCount = this.products.length;
        this.products = this.products.filter(p => p.brandId != brandId);
        const finalCount = this.products.length;
        return initialCount - finalCount;
    }
}

// Exporta la instancia, no la clase
module.exports = new ProductsService();