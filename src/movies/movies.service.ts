import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movies.schema';
import axios from 'axios';
import { Dropbox } from 'dropbox';
import * as cloudinary from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class MoviesService {
  private readonly cloudinary = cloudinary.v2;

  constructor(
    @InjectModel(Movie.name) private readonly moviesModel: Model<Movie>,
  ) {
    this.cloudinary.config({
      cloud_name: 'docqe6ztx',
      api_key: '575196377231944',
      api_secret: '6BrsN9TkLoBn6757Uvv-i7ceYxI',
    });
  }

  async create(
    movie: Movie,
    imageFile: Buffer,
    videoFile: Buffer,
    bannerFile: Buffer,
  ): Promise<Movie> {
    try {
      // Use the chunk upload service to handle the upload
      const imageUrl = await this.chunkUpload(
        imageFile,
        `${movie.title}-image`,
      );
      const videoUrl = await this.chunkUpload(
        videoFile,
        `${movie.title}-video`,
      );
      const bannerUrl = await this.chunkUpload(
        bannerFile,
        `${movie.title}-banner`,
      );

      // Set the URLs in the movie object
      movie.imageUrl = imageUrl;
      movie.videoUrl = videoUrl;
      movie.bannerUrl = bannerUrl;

      // Save the movie to the database
      const createdMovie = new this.moviesModel(movie);
      return createdMovie.save();
    } catch (error) {
      throw error;
    }
  }

  async chunkUpload(fileData: Buffer, fileName: string): Promise<string> {
    try {
      // Send a POST request to the Cloudinary upload API endpoint
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/docqe6ztx/upload',
        {
          file: fileData,
          public_id: fileName,
          resource_type: 'auto',
          chunk_size: 6000000, // chunk size in bytes (6 MB in this example)
        },
      );

      return response.data.secure_url;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Movie[]> {
    return this.moviesModel.find().exec();
  }

  async findOneById(id: string): Promise<Movie> {
    return this.moviesModel.findById(id).exec();
  }

  async update(id: string, movie: Movie): Promise<Movie> {
    return this.moviesModel.findByIdAndUpdate(id, movie, { new: true }).exec();
  }

  async delete(id: string): Promise<Movie> {
    return this.moviesModel.findByIdAndDelete(id).exec();
  }
}
