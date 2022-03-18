import { GetFlightsResponseStub } from '../test/stubs/flight.stub';

export const FlightService = jest.fn().mockReturnValue({
  getFlightsFromStorage: jest.fn().mockResolvedValue(GetFlightsResponseStub()),
  updateFlights: jest.fn().mockReturnValue(null),
  didFlightsChanged: jest.fn().mockReturnValue(false),
});
