const faker = require('faker');

    class UsersService {
    constructor() {
        this.users = [];
        this.generate();
    }

    generate() {
        // GaboytesMtzFrak@gmail.comeneramos 10 usuarios para el ejemplo
        for (let i = 0; i < 10; i++) {
        this.users.push({
            id: i + 1,
            name: faker.name.findName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar()
        });
        }
    }

    getAll() {
        return this.users;
    }

    getById(id) {
        // Usamos '==' porque el id de los params viene como string
        return this.users.find(u => u.id == id);
    }

    create(data) {
        const newUser = {
        id: this.users.length + 1,
        ...data
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id, changes) {
        const index = this.users.findIndex(u => u.id == id);
        if (index === -1) {
        // O puedes retornar null o un objeto de error
        throw new Error('User not found'); 
        }
        const user = this.users[index];
        this.users[index] = {
        ...user,
        ...changes
        };
        return this.users[index];
    }

    delete(id) {
        const index = this.users.findIndex(u => u.id == id);
        if (index === -1) {
        throw new Error('User not found');
        }
        this.users.splice(index, 1);
        // Retornamos el id para confirmar la eliminación
        return { id };
    }
    }

    // Exporta la instancia, no la clase
    module.exports = new UsersService();