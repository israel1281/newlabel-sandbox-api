import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';
import { BannerModule } from './banner/banner.module';
import { SectionsModule } from './sections/sections.module';
import { WatchingModule } from './watching/watching.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbIsrael:waldav125@cluster0.fcfys.mongodb.net/newlabel?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    CustomerModule,
    AdminModule,
    BannerModule,
    SectionsModule,
    WatchingModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
