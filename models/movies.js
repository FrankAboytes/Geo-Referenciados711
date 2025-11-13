const mongoose = require('mongoose');

// Definimos el Schema para las películas
const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true // Quita espacios en blanco al inicio y al final
    },
    description: {
        type: String
    },
    releaseYear: {
        type: Number,
        min: 1888 // Año de la primera película
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    }
    // Puedes añadir más campos aquí (director, género, etc.)
}, {
    timestamps: true // Esto añade createdAt y updatedAt automáticamente
});

// Exportamos el modelo para que los servicios puedan usarlo
module.exports = mongoose.model('Movie', MovieSchema);