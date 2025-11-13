const Movie = require('../models/movies'); // <-- Importa el NUEVO modelo

class MoviesServices {

  async create(data) {
    const newMovie = new Movie(data);
    await newMovie.save();
    return newMovie;
  }

  async find() {
    return await Movie.find();
  }

  async findOne(id) {
    return await Movie.findById(id);
  }

  async update(id, changes) {
    return await Movie.findByIdAndUpdate(id, changes, { new: true });
  }

  async delete(id) {
    return await Movie.findByIdAndDelete(id);
  }
}

module.exports = MoviesServices;