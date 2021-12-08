import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesController } from './controller/movies.controller';
import { MoviesService } from './service/movies.service';
import { Movie, MovieSchema } from './schema/movie.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
