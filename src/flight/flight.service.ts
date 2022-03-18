import { HttpService, Injectable, Logger } from '@nestjs/common';
import {
  catchError,
  forkJoin,
  lastValueFrom,
  map,
  Observable,
  of,
  retry,
  timeout,
} from 'rxjs';
import { FlightsDto, GetFlightsResponse } from './dto/flight.model';
import { generateIdForSlice } from './utils/generateIdForSlice';
import { FlightRepository } from './repository/flight.repository';

@Injectable()
export class FlightService {
  logger: Logger;
  constructor(
    private readonly httpService: HttpService,
    private readonly flightRepository: FlightRepository,
  ) {
    this.logger = new Logger('FlightService');
  }

  async getFlights(): Promise<GetFlightsResponse> {
    this.logger.log('getting flights');
    const res = await lastValueFrom<GetFlightsResponse>(
      this.getFlightsFromDifferentSources().pipe(
        map((response) => {
          const flights: GetFlightsResponse = {
            statusCode: 200,
            results: 0,
            data: {
              flights: [],
            },
          };
          // merge two observables
          flights.data.flights = response.reduce((all, itm) => {
            return all.concat(itm.flights);
          }, []);
          flights.results = flights.data.flights.length;

          return flights;
        }),
        catchError((error, cathced) => {
          this.logger.log('request failed');
          return of({
            statusCode: 500,
            results: 0,
            data: {
              flights: [],
            },
          });
        }),
      ),
    );

    // remove duplicate flights
    res.data.flights = Array.from(
      new Set(res.data.flights.map((a) => a.id)),
    ).map((id) => {
      return res.data.flights.find((a) => a.id === id);
    });
    // get flights from storage if update if needed
    const cachedflights = await this.flightRepository.getFlightsFromStorage(
      res,
    );

    res.statusCode = 200;
    res.results = cachedflights.flights.length;
    res.data = cachedflights;

    return res;
  }

  private getFlightsFromDifferentSources(): Observable<
    [FlightsDto, FlightsDto]
  > {
    this.logger.log('sending requests to retreive flights');
    return forkJoin([
      this.httpService
        .get<FlightsDto>('http://164.90.161.111:8080/flight/source1')
        .pipe(
          map((response) => {
            response.data.flights = generateIdForSlice(response.data.flights);
            return response.data;
          }),
        ),
      this.httpService
        .get<FlightsDto>('http://164.90.161.111:8080/flight/source2')
        .pipe(
          map((response) => {
            response.data.flights = generateIdForSlice(response.data.flights);
            return response.data;
          }),
        ),
    ]).pipe(
      retry(4),
      timeout({
        each: 900,
      }),
    );
  }
}
