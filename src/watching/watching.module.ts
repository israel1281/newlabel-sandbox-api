import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Watching, WatchingSchema } from './watching.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Watching.name, schema: WatchingSchema },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class WatchingModule {}
