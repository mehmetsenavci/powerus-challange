import { GetFlightsResponseStub } from '../test/stubs/flight.stub';

export const FlightService = jest.fn().mockReturnValue({
  getFlights: jest.fn().mockResolvedValue(GetFlightsResponseStub()),
});
