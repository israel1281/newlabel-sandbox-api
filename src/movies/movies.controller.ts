import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Delete,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './interfaces/movie.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOneById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() movie: Movie): Promise<Movie> {
    return this.moviesService.update(id, movie);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.delete(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() imageUrl: any,
    @UploadedFile() videoUrl: any,
    @UploadedFile() bannerUrl: any,
  ): Promise<Movie> {
    return this.moviesService.create(
      createMovieDto,
      imageUrl,
      videoUrl,
      bannerUrl,
    );
  }
}
