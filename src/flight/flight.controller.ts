import { Controller, Get } from '@nestjs/common';
import { GetFlightsResponse } from './dto/flight.model';
import { FlightService } from './flight.service';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get()
  getFlights(): Promise<GetFlightsResponse> {
    return this.flightService.getFlights();
  }
}
