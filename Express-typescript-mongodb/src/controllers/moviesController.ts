import { commonControllerHandler } from '../utils';
import { Request, Response } from 'express';
import { Movie } from '../models/movieModel';

export async function findAll(req: Request, res: Response) {
  commonControllerHandler(res, async () => {
    const allMovies = await Movie.find();
    res.status(200).send(allMovies);
  });
}

export async function findById(req: Request, res: Response) {
  commonControllerHandler(res, async () => {
    const movie = await Movie.findById(req.params.id);
    movie ? res.status(200).send(movie) : res.status(404).send({ message: 'Movie not found!' });
  });
}

export function create(req: Request, res: Response) {
  commonControllerHandler(res, async () => {
    const createdMovie = await Movie.create(req.body);
    res.status(201).send(createdMovie);
  });
}

export function update(req: Request, res: Response) {
  commonControllerHandler(res, async () => {
    const { id, ...body } = req.body;

    // update methods always return the previous data.
    const updatedMovie = await Movie.findByIdAndUpdate(id, { $set: { ...body } }, { new: true });
    if (updatedMovie) {
      res.status(201).send(updatedMovie);
      return;
    }
    res.status(404).send({ message: 'Movie not found!' });
  });
}

export function removeById(req: Request, res: Response) {
  commonControllerHandler(res, async () => {
    // update methods always return the previous data.
    const removedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (removedMovie) {
      res.status(201).send({ message: `The movie with ${req.params.id} id deleted!` });
      return;
    }
    res.status(404).send({ message: 'Movie not found!' });
  });
}
