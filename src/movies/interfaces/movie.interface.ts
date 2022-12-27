import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Movie extends Document {
  readonly title: string;
  readonly year: number;
  readonly imageUrl: string;
  readonly bannerUrl: string;
  readonly videoUrl: string;
  readonly duration: number;
  readonly description: string;
  readonly price: number;
  readonly categories: string[];
  readonly genres: string[];
}

@Schema()
export class MovieSchema {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  videoUrl: string;

  @Prop({ required: true })
  bannerUrl: string;

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

export const MovieSchemaFactory = SchemaFactory.createForClass(MovieSchema);
