import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Movie extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  bannerUrl: string;

  @Prop({ required: true })
  videoUrl: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, type: [String] })
  categories: string[];

  @Prop({ required: true, type: [String] })
  genres: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
