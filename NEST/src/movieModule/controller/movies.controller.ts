import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { MoviesService } from '../service/movies.service';
import { CreateMovieDto } from '../dto/createMovie.dto';
import { UpdateMovieDto } from '../dto/updateMovie.dto';

@Controller('api/movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Get()
  async findAll() {
    return await this.movieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.movieService.findById(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.create(createMovieDto);
  }

  @Put()
  @HttpCode(201)
  async update(@Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(updateMovieDto);
  }

  @Delete(':id')
  @HttpCode(201)
  async delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
