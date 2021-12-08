import { v4 as uuidv4 } from 'uuid';
import movies from '../data/movieData.js';

// Simulate Mongoose, mongoDB

export default class Movie {
  static findAll() {
    return new Promise((resolve, reject) => {
      resolve(movies);
    });
  }
  static findById(id) {
    return new Promise((resolve, reject) => {
      const findedMovie = movies.find((movie) => movie.id === id);
      resolve(findedMovie);
    });
  }
  static create(movie) {
    return new Promise((resolve, reject) => {
      //!Demo propouse only!
      if (movie.title === 'error') {
        reject(new Error('This is a movie with name: ' + movie.title));
      }

      const id = uuidv4();
      const newMovie = { id, ...movie };
      movies.push(newMovie);
      resolve(newMovie);
    });
  }
  static update(movie) {
    return new Promise((resolve, reject) => {
      const index = movies.findIndex((movieObj) => movieObj.id === movie.id);
      movies[index] = movie;
      resolve(movie);
    });
  }
  static removeById(id) {
    return new Promise((resolve, reject) => {
      const index = movies.findIndex((movie) => movie.id === id);
      movies.splice(index, 1);
      resolve();
    });
  }
}
