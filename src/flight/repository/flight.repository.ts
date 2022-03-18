import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Flight, FlightDocument } from '../schema/flight.schema';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import {
  FlightInfoDto,
  FlightsDto,
  GetFlightsResponse,
} from '../dto/flight.model';

@Injectable()
export class FlightRepository {
  logger: Logger;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
  ) {
    this.logger = new Logger('FlightRepository');
  }

  async getFlightsFromStorage(res: GetFlightsResponse): Promise<FlightsDto> {
    let cachedData = await this.cacheManager.get<FlightsDto>('flights');
    this.logger.log('getting flights from cache');
    // update cache from db with most recent if cache is empty
    if (cachedData === null) {
      cachedData = {
        flights: [],
      };
      this.logger.log('flights not found in cache');
      cachedData.flights = await this.flightModel.find({}, { _id: 0, __v: 0 });
      this.logger.log('retreived data from db');
      this.logger.log('writing data to cache');
      await this.cacheManager.set('flights', cachedData);
    }

    // update data if more recent response received
    if (
      this.didFlightsChanged(res.data.flights, cachedData.flights) &&
      res.results > 0
    ) {
      this.updateFlights(res.data);
    }

    if (cachedData.flights.length > 0) {
      return cachedData;
    }

    return {
      flights: [],
    };
  }

  async updateFlights(flights: FlightsDto) {
    this.logger.log('updating data on cache');
    await this.cacheManager.set('flights', flights);
    this.logger.log('updating data on db');
    await this.flightModel.insertMany(flights.flights);
  }

  private didFlightsChanged(
    fromRequest: FlightInfoDto[],
    fromCache: FlightInfoDto[],
  ): boolean {
    return JSON.stringify(fromRequest) !== JSON.stringify(fromCache);
  }
}
