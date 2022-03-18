import { CacheModule, HttpModule } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { GetFlightsResponse } from '../dto/flight.model';
import { FlightController } from '../flight.controller';
import { FlightService } from '../flight.service';
import { FlightRepository } from '../repository/flight.repository';
import { Flight } from '../schema/flight.schema';
import { GetFlightsResponseStub } from './stubs/flight.stub';

jest.mock('../flight.service');
describe('FlightController', () => {
  let flightController: FlightController;
  let flightService: FlightService;

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

    flightController = moduleRef.get<FlightController>(FlightController);
    flightService = moduleRef.get<FlightService>(FlightService);

    jest.clearAllMocks();
  });

  describe('getFlights', () => {
    describe('when getFlight is called', () => {
      let flights: GetFlightsResponse;

      beforeEach(async () => {
        flights = await flightController.getFlights();
      });

      it('should call flightsService', () => {
        expect(flightService.getFlights).toHaveBeenCalled();
      });

      it('should return', () => {
        expect(flights).toEqual(GetFlightsResponseStub());
      });
    });
  });
});
