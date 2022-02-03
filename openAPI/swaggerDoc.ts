import config from 'config';
import { getFlights } from './flights';
export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: `${config.get('app.appName')}`,
    description: `API Documentation for ${config.get(
      'app.appName',
    )} Mini Project`,
    termsOfService: '',
    contact: {
      name: 'Abbdulraheem Sherif A',
      email: 'aabdulraheemsherif@gmail.com',
      url: 'https://github.com/adavurku',
    },
  },
  tags: [
    {
      name: 'Flights',
      description: 'Flights API',
    },
  ],
  schemes: ['http'],
  paths: {
    '/v1/flight': {
      get: getFlights,
    },
  },
  host: 'localhost:8080',
  basePath: '/',
  license: {
    name: 'Apache 2.0',
    url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
  },
};
