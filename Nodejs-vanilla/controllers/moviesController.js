import Movie from '../models/movieModel.js';
import { getRequestBody, Response, sleep } from '../utils.js';

async function getMovies(req, res) {
  try {
    // If you want to simulate high response time. sleep function imported from utils.js
   await sleep(10000);
    const movies = await Movie.findAll();
    Response.ok(res, movies);
  } catch (e) {
    console.error(e);
    Response.internalError(res, e);
  }
}

async function getMovie(req, res, id) {
  try {
    const movie = await Movie.findById(id);

    if (movie) {
      Response.ok(res, movie);
    } else {
      Response.notFound(res, 'Movie not found');
    }
  } catch (e) {
    console.error(e);
    Response.internalError(res, e);
  }
}

async function createMovie(req, res) {
  try {
    const movie = await getRequestBody(req);
    const newMovie = await Movie.create(movie);
    Response.created(res, newMovie);
  } catch (e) {
    console.error(e);
    Response.internalError(res, e);
  }
}

async function updateMovie(req, res) {
  try {
    const movie = await getRequestBody(req);
    const findedMovie = await Movie.findById(movie.id);

    if (findedMovie) {
      const updatedMovie = await Movie.update(movie);
      Response.updated(res, updatedMovie);
    } else {
      Response.notFound(res, 'Movie not found');
    }
  } catch (e) {
    console.error(e);
    Response.internalError(res, e);
  }
}

async function deleteMovie(req, res, id) {
  console.log(id);
  try {
    const findedMovie = await Movie.findById(id);
    if (findedMovie) {
      await Movie.removeById(id);
      Response.deleted(res, `Movie with ${id} id deleted!`);
    } else {
      Response.notFound(res, 'Movie not found');
    }
  } catch (error) {
    Response.internalError(res, error);
  }
}

export { getMovies, getMovie, createMovie, updateMovie, deleteMovie };
