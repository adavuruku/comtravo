import { allFlights, roundTripFlight } from './flight.service';
import { Flight } from '../../schema/flight/flight.schema';
import { request, response } from 'express';
import { RoundTripMain } from '../../schema/flight/roundTripMain.schema';
import supertest from 'supertest';
import app from '../../../app';
const mockingoose = require('mockingoose');

describe('Mocking Service - Test', () => {
  beforeAll(async () => {
    supertest(await app);
  });
  it('mock test allFlights (regular)', async () => {
    const sampleData = {
      _id: '61f9da768640eceb94123659',
      price: 141.63,
      origin_name: 'Tegel',
      destination_name: 'Heathrow',
      departure_date_time_utc: '2019-08-08T15:25:00.000Z',
      arrival_date_time_utc: '2019-08-08T17:30:00.000Z',
      flight_number: '8464',
      duration: 125,
    };
    // Flight.find = jest.fn().mockResolvedValue([sampleData]);
    const t = jest.spyOn(Flight, 'find');
    const j = await allFlights(request, response);
    expect(t).toHaveBeenCalled();
    expect(j).toEqual([sampleData]);
  });

  it('mock test allFlights (round trip)', async () => {
    const sampleData = {
      _id: '61f9da768640eceb94123659',
      price: 141.63,
      slice: [
        {
          origin_name: 'Tegel',
          destination_name: 'Heathrow',
          departure_date_time_utc: '2019-08-08T15:25:00.000Z',
          arrival_date_time_utc: '2019-08-08T17:30:00.000Z',
          flight_number: '8464',
          duration: 125,
        },
        {
          origin_name: 'Tegel',
          destination_name: 'Heathrow',
          departure_date_time_utc: '2019-08-08T15:25:00.000Z',
          arrival_date_time_utc: '2019-08-08T17:30:00.000Z',
          flight_number: '8464',
          duration: 125,
        },
      ],
    };
    mockingoose(RoundTripMain).toReturn(
      [
        {
          _id: '61f9da768640eceb94123659',
          price: 141.63,
          slice: [
            {
              origin_name: 'Tegel',
              destination_name: 'Heathrow',
              departure_date_time_utc: '2019-08-08T15:25:00.000Z',
              arrival_date_time_utc: '2019-08-08T17:30:00.000Z',
              flight_number: '8464',
              duration: 125,
            },
            {
              origin_name: 'Tegel',
              destination_name: 'Heathrow',
              departure_date_time_utc: '2019-08-08T15:25:00.000Z',
              arrival_date_time_utc: '2019-08-08T17:30:00.000Z',
              flight_number: '8464',
              duration: 125,
            },
          ],
        },
      ],
      'find',
    );
    const results = await roundTripFlight(request, response);
    // expect(results).toBeInstanceOf(response);
    // RoundTripMain.find = jest
    //   .fn()
    //   .mockImplementation(() => [sampleData])
    //   .mockResolvedValue()..mockImplementation()
    //   .sort.mockImplementation();
    // // const t = jest.spyOn(RoundTripMain.prototype, 'find');
    // const j = await roundTripFlight(request, response);
    // // expect(t).toHaveBeenCalled();
    // await expect(j).resolves.toEqual([sampleData]);
  });
});
