import { FlightInfoDto } from '../dto/flight.model';

export function generateIdForSlice(flights: any): FlightInfoDto[] {
  return flights.map((val) => {
    let id = '';
    val.slices.forEach((slice) => {
      id += slice.flight_number + '-';
    });
    id = id.substring(0, id.length - 1);
    return { id, slices: val.slices, price: val.price };
  });
}
