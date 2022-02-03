// require('dotenv').config({ path: '../.env' });
import express, { Request, Response } from 'express';
import config from 'config';
import { connect } from './dbConfig/dbConnection';
const app = express();
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from '../openAPI/swaggerDoc';

import { flightRoute } from './app/controller/flight/flight.controller';
app.use('/v1/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.use('/v1/flight', flightRoute);

app.get('/v1', (req, res) => res.send('Server started'));

app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: 'Not found',
    },
  });
});
export default app;
