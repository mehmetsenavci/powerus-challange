import { FlightsDto, GetFlightsResponse } from 'src/flight/dto/flight.model';

export const GetFlightsResponseStub = (): GetFlightsResponse => {
  return {
    statusCode: 200,
    results: 8,
    data: {
      flights: [
        {
          id: '144-8542',
          slices: [
            {
              origin_name: 'Schonefeld',
              destination_name: 'Stansted',
              departure_date_time_utc: '2019-08-08T04:30:00.000Z',
              arrival_date_time_utc: '2019-08-08T06:25:00.000Z',
              flight_number: '144',
              duration: 115,
            },
            {
              origin_name: 'Stansted',
              destination_name: 'Schonefeld',
              departure_date_time_utc: '2019-08-10T05:35:00.000Z',
              arrival_date_time_utc: '2019-08-10T07:35:00.000Z',
              flight_number: '8542',
              duration: 120,
            },
          ],
          price: 129,
        },
        {
          id: '8545-145',
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
        {
          id: '8545-145',
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
    },
  };
};

export const FlightsDtoStub = (): FlightsDto => {
  return {
    flights: [
      {
        id: '144-8542',
        slices: [
          {
            origin_name: 'Schonefeld',
            destination_name: 'Stansted',
            departure_date_time_utc: '2019-08-08T04:30:00.000Z',
            arrival_date_time_utc: '2019-08-08T06:25:00.000Z',
            flight_number: '144',
            duration: 115,
          },
          {
            origin_name: 'Stansted',
            destination_name: 'Schonefeld',
            departure_date_time_utc: '2019-08-10T05:35:00.000Z',
            arrival_date_time_utc: '2019-08-10T07:35:00.000Z',
            flight_number: '8542',
            duration: 120,
          },
        ],
        price: 129,
      },
      {
        id: '8545-145',
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
      {
        id: '8545-145',
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
  };
};
