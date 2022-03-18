import { CacheModule, HttpModule, HttpService } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { FlightDto, FlightsDto, GetFlightsResponse } from '../dto/flight.model';
import { FlightController } from '../flight.controller';
import { FlightService } from '../flight.service';
import { FlightRepository } from '../repository/flight.repository';
import { Flight } from '../schema/flight.schema';
import { FlightsDtoStub, GetFlightsResponseStub } from './stubs/flight.stub';

jest.mock('../repository/flight.repository');
describe('FlightService', () => {
  let flightRepository: FlightRepository;
  let flightService: FlightService;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, CacheModule.register()],
      controllers: [FlightController],
      providers: [
        FlightService,
        FlightRepository,
        {
          provide: getModelToken('Flight'),
          useValue: Flight,
        },
      ],
    }).compile();

    flightRepository = moduleRef.get<FlightRepository>(FlightRepository);
    flightService = moduleRef.get<FlightService>(FlightService);
    httpService = moduleRef.get<HttpService>(HttpService);

    jest.clearAllMocks();
  });

  describe('getFlights', () => {
    describe('when getFlight is called', () => {
      let flights: FlightsDto;

      it('get flights should be defined', async () => {
        expect(flightService.getFlights).toBeDefined();
      });

      it('should get response from endpoints', async () => {
        const httpSpy = jest.spyOn(httpService, 'get').mockReturnValue(
          of<any>({
            flights: [
              {
                slices: [
                  {
                    origin_name: 'Schonefeld',
                    destination_name: 'Stansted',
                    departure_date_time_utc: '2019-08-08T16:00:00.000Z',
                    arrival_date_time_utc: '2019-08-08T17:55:00.000Z',
                    flight_number: '146',
                    duration: 115,
                  },
                  {
                    origin_name: 'Stansted',
                    destination_name: 'Schonefeld',
                    departure_date_time_utc: '2019-08-10T18:00:00.000Z',
                    arrival_date_time_utc: '2019-08-10T20:00:00.000Z',
                    flight_number: '8544',
                    duration: 120,
                  },
                ],
                price: 130.1,
              },
              {
                slices: [
                  {
                    origin_name: 'Schonefeld',
                    destination_name: 'Stansted',
                    departure_date_time_utc: '2019-08-08T20:25:00.000Z',
                    arrival_date_time_utc: '2019-08-08T22:25:00.000Z',
                    flight_number: '8545',
                    duration: 120,
                  },
                  {
                    origin_name: 'Stansted',
                    destination_name: 'Schonefeld',
                    departure_date_time_utc: '2019-08-10T06:50:00.000Z',
                    arrival_date_time_utc: '2019-08-10T08:40:00.000Z',
                    flight_number: '145',
                    duration: 110,
                  },
                ],
                price: 134.81,
              },
            ],
          }),
        );

        const repoSpy = jest
          .spyOn(flightRepository, 'getFlightsFromStorage')
          .mockResolvedValue(FlightsDtoStub());

        const result = await flightService.getFlights();
        const repoSpyVal = await repoSpy.mock.results[0].value;

        expect(result).toEqual({
          statusCode: 200,
          results: repoSpyVal.flights.length,
          data: repoSpyVal,
        });
      });

      it('should get empty list', async () => {
        const httpSpy = jest.spyOn(httpService, 'get').mockReturnValue(
          of<any>({
            statusCode: 500,
            message: 'Internal Server Error',
          }),
        );

        const repoSpy = jest
          .spyOn(flightRepository, 'getFlightsFromStorage')
          .mockResolvedValue({ flights: [] });

        const result = await flightService.getFlights();
        const repoSpyVal = await repoSpy.mock.results[0].value;

        expect(result).toEqual({
          statusCode: 200,
          results: repoSpyVal.flights.length,
          data: repoSpyVal,
        });
      });

      it('should retreive data from storage if exists on failed request', async () => {
        const httpSpy = jest.spyOn(httpService, 'get').mockReturnValue(
          of<any>({
            statusCode: 500,
            message: 'Internal Server Error',
          }),
        );

        const repoSpy = jest
          .spyOn(flightRepository, 'getFlightsFromStorage')
          .mockResolvedValue(FlightsDtoStub());

        const result = await flightService.getFlights();
        const repoSpyVal = await repoSpy.mock.results[0].value;

        expect(result).toEqual({
          statusCode: 200,
          results: repoSpyVal.flights.length,
          data: repoSpyVal,
        });
      });
    });
  });
});
