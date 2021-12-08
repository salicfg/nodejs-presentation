import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MoviesModule } from './movieModule/movies.module';
import configuration from './config/configuration';
import mongooseConfig from './config/mongoose.config';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mongooseConfig,
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
