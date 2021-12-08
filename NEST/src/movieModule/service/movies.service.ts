import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Movie, MovieDocument } from '../schema/movie.schema';
import { CreateMovieDto } from '../dto/createMovie.dto';
import { ResponseMovieDto } from '../dto/responseMovie.dto';
import { MovieMapper } from '../mapper/movie.mapper';
import { UpdateMovieDto } from '../dto/updateMovie.dto';
import { ResponseMessageDto } from '../dto/responseMessage.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async findAll(): Promise<ResponseMovieDto[]> {
    // .exec(): Execute the query then return a Promise
    const moviesDocument = await this.movieModel.find().exec();
    return MovieMapper.documentArrayToResponseDtoArray(moviesDocument);
  }

  async findById(id: string): Promise<ResponseMovieDto> {
    const movieDocument = await this.movieModel.findById(id).exec();
    if (movieDocument) {
      return MovieMapper.documentToResponseDto(movieDocument);
    }
    throw new NotFoundException('Movie not found!');
  }

  async create(createMovieDto: CreateMovieDto): Promise<ResponseMovieDto> {
    const createdMovieDocument = await this.movieModel.create(createMovieDto);
    return MovieMapper.documentToResponseDto(createdMovieDocument);
  }

  async update(updateMovieDto: UpdateMovieDto): Promise<ResponseMovieDto> {
    const { _id, ...movie } = updateMovieDto;
    const updatedMovieDocument = await this.movieModel
      .findByIdAndUpdate(_id, { $set: { ...movie } }, { new: true })
      .exec();
    if (updatedMovieDocument) {
      return MovieMapper.documentToResponseDto(updatedMovieDocument);
    }
    throw new NotFoundException('Movie not found!');
  }

  async delete(id: string): Promise<ResponseMessageDto> {
    const deletedMovieDocument = await this.movieModel.findByIdAndDelete(id);
    if (deletedMovieDocument) {
      return { message: `The movie with ${id} id deleted!` };
    }
    throw new NotFoundException('Movie not found!');
  }
}
