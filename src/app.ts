// require('dotenv').config({ path: '../.env' });
import express, { Request, Response } from 'express';
import config from 'config';
import { connect } from './dbConfig/dbConnection';
const app = express();
import { scheduleJobToFetchApi } from './common/cronjobs/seedDb';

import { flightRoute } from './app/controller/flight/flight.controller';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/flight', flightRoute);
app.get('/', (req, res) => res.send('Express + yeah nd fff TypeScript Server'));
// app.get('/user', (req: Request, res: Response) => {
//   console.log('got this');
//   return res.status(200).json({ message: `User with id not found.` });
// });
connect();
scheduleJobToFetchApi();

app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: 'Server error',
    },
  });
});
export default app;
