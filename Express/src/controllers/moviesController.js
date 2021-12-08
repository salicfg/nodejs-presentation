import Movie from "../models/movieModel.js";
import {
  internalServerError,
  commonControllerHandler,
  isRequestObjectValid,
} from "../utils.js";
import {
  movieCreateSchema,
  movieUpdateSchema,
} from "../schemas/movieSchema.js";

export async function findAll(req, res) {
  commonControllerHandler(res, async () => {
    const allMovies = await Movie.findAll();
    res.status(200).send(allMovies);
  });
}

export async function findById(req, res) {
  commonControllerHandler(res, async () => {
    const movie = await Movie.findById(req.params.id);
    movie
      ? res.status(200).send(movie)
      : res.status(404).send({ message: "Movie not found!" });
  });
}

export function create(req, res) {
  if (isRequestObjectValid(res, movieCreateSchema, req.body)) {
    return;
  }

  if (req.body.title === "error") {
    new Error("The is a generated error!");
    internalServerError(res);
  }
  commonControllerHandler(res, async () => {
    const createdMovie = await Movie.create(req.body);
    res.status(201).send(createdMovie);
  });
}

export function update(req, res) {
  if (isRequestObjectValid(res, movieUpdateSchema, req.body)) {
    return;
  }

  commonControllerHandler(res, async () => {
    const movie = await Movie.findById(req.body.id);
    if (movie) {
      const updatedMovie = await Movie.update(req.body);
      res.status(201).send(updatedMovie);
      return;
    }
    res.status(404).send({ message: "Movie not found!" });
  });
}

export function removeById(req, res) {
  commonControllerHandler(res, async () => {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      await Movie.removeById(req.params.id);
      res
        .status(200)
        .send({ message: `The movie with ${req.params.id} id deleted!` });
    } else {
      res.status(404).send({ message: "Movie not found!" });
    }
  });
}
