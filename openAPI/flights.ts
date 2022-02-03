const flightSchema = {
  properties: {
    _id: {
      type: 'string',
      description: 'Item Id',
    },
    price: {
      type: 'number',
      description: 'Flight price',
    },
    origin_name: {
      type: 'string',
      description: 'Flight origin',
    },
    destination_name: {
      type: 'string',
      description: 'Flight destination',
    },
    departure_date_time_utc: {
      type: 'string',
      description: 'Flight departure time',
    },
    arrival_date_time_utc: {
      type: 'string',
      description: 'Flight arrival time',
    },
    flight_number: {
      type: 'string',
      description: 'Flight number',
    },
    duration: {
      type: 'number',
      description: 'Flight duration',
    },
  },
};

export const getFlights = {
  tags: ['Flights'],
  summary: 'Returns all available flight(s) from the system ',
  operationId: 'getFlights',
  // security: [
  //   {
  //     bearerAuth: (any = [any]),
  //   },
  // ],
  responses: {
    '200': {
      description: 'A list of flights.',
      content: {
        'application/json': {
          schema: {
            flight: {
              ...flightSchema,
            },
            flights: {
              type: 'array',
              ...flightSchema,
            },
          },
        },
      },
    },
  },
};
