import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Customer } from '../customer/customer.schema';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Watching extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  })
  customer: Customer;

  @Prop()
  progress: number;
}

export const WatchingSchema = SchemaFactory.createForClass(Watching);
