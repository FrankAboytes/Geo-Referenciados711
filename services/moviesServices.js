const Movie = require('../models/movies');

class MoviesServices {
  async getAll() {
    try {
      const movies = await Movie.find();
      return movies;
    } catch (error) {
      throw new Error(`Error getting movies: ${error.message}`);
    }
  }

  async findOne(id) {
    try {
      const movie = await Movie.findById(id);
      return movie;
    } catch (error) {
      throw new Error(`Error getting movie: ${error.message}`);
    }
  }

  async create(movieData) {
    try {
      const movie = new Movie(movieData);
      const savedMovie = await movie.save();
      return savedMovie;
    } catch (error) {
      throw new Error(`Error creating movie: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const movie = await Movie.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      return movie;
    } catch (error) {
      throw new Error(`Error updating movie: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const movie = await Movie.findByIdAndDelete(id);
      return movie;
    } catch (error) {
      throw new Error(`Error deleting movie: ${error.message}`);
    }
  }
}

module.exports = MoviesServices;  