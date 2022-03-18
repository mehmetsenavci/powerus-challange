import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flight/flight.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    FlightModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
