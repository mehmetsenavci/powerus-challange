export interface GetFlightsResponse {
  statusCode: number;
  results: number;
  data: FlightsDto;
}

export interface FlightDto {
  origin_name: string;
  destination_name: string;
  departure_date_time_utc: string;
  arrival_date_time_utc: string;
  flight_number: string;
  duration: number;
}

export interface FlightsDto {
  flights: FlightInfoDto[];
}

export interface FlightInfoDto {
  id: string;
  slices: FlightDto[];
  price: number;
}
