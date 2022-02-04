export const getFlights = {
  tags: ['Flights'],
  description: 'Returns all available flight(s) from the system ',
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
            type: 'object',
            allOf: [
              {
                properties: {
                  _id: {
                    type: 'string',
                    description: 'Item Id',
                    example: '61f9da768640eceb94123659',
                  },
                  price: {
                    type: 'number',
                    description: 'Flight price',
                    example: 141.63,
                  },
                  origin_name: {
                    type: 'string',
                    description: 'Flight origin',
                    example: 'Heathrow',
                  },
                  destination_name: {
                    type: 'string',
                    description: 'Flight destination',
                    example: 'Tegel',
                  },
                  departure_date_time_utc: {
                    type: 'string',
                    description: 'Flight departure time',
                    example: '2019-08-08T17:30:00.000Z',
                  },
                  arrival_date_time_utc: {
                    type: 'string',
                    description: 'Flight arrival time',
                    example: '2019-08-08T15:25:00.000Z',
                  },
                  flight_number: {
                    type: 'string',
                    description: 'Flight number',
                    example: '8464',
                  },
                  duration: {
                    type: 'number',
                    description: 'Flight duration',
                    example: 122,
                  },
                },
              },
            ],
          },
        },
      },
    },
    '500': {
      description: 'Service is a down for the moment',
    },
  },
};

export const getRoundTripFlights = {
  tags: ['Flights'],
  description: 'Returns all available flight(s) from the system ',
  operationId: 'getRoundTripFlights',
  responses: {
    '200': {
      description: 'A list of flights.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            allOf: [
              {
                properties: {
                  _id: {
                    type: 'string',
                    description: 'Item Id',
                    example: '61f9da768640eceb94123659',
                  },
                  price: {
                    type: 'number',
                    description: 'Flight price',
                    example: 141.63,
                  },
                  slice: {
                    type: 'object',
                    description: 'Flight price',
                    allOf: [
                      {
                        properties: {
                          origin_name: {
                            type: 'string',
                            description: 'Flight origin',
                            example: 'Heathrow',
                          },
                          destination_name: {
                            type: 'string',
                            description: 'Flight destination',
                            example: 'Tegel',
                          },
                          departure_date_time_utc: {
                            type: 'string',
                            description: 'Flight departure time',
                            example: '2019-08-08T17:30:00.000Z',
                          },
                          arrival_date_time_utc: {
                            type: 'string',
                            description: 'Flight arrival time',
                            example: '2019-08-08T15:25:00.000Z',
                          },
                          flight_number: {
                            type: 'string',
                            description: 'Flight number',
                            example: '8464',
                          },
                          duration: {
                            type: 'number',
                            description: 'Flight duration',
                            example: 122,
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
    },
    '500': {
      description: 'Service is a down for the moment',
    },
  },
};
