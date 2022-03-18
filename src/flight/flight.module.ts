import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import * as redisStore from 'cache-manager-redis-store';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from './schema/flight.schema';
import { FlightRepository } from './repository/flight.repository';

@Module({
  controllers: [FlightController],
  providers: [FlightService, FlightRepository],
  imports: [
    HttpModule,
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 60 * 5,
    }),
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
  ],
})
export class FlightModule {}
