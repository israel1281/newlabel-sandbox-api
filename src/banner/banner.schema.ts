import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Banner extends Document {
  @Prop()
  nameOfBanner: string;

  @Prop()
  movieTitle: string;

  @Prop()
  extra: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  imageUrl: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
