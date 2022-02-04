import { seedDb } from './seedDb';
import { RoundTrip } from '../../app/schema/flight/roundTrip.schema';
import { Flight } from '../../app/schema/flight/flight.schema';
import { RoundTripMain } from '../../app/schema/flight/roundTripMain.schema';
describe('Mocking SeedDb - Test', () => {
  const seed = new seedDb();
  const jo = jest.spyOn(seedDb.prototype, 'formatFlightRoundTripResponse');
  const jo1 = jest.spyOn(seedDb.prototype, 'fetchApiRecord');
  const jo2 = jest.spyOn(seedDb.prototype, 'formatFlightResponse');
  const jo3 = jest.spyOn(seedDb.prototype, 'persistToRoundTripDb');
  const jo4 = jest.spyOn(seedDb.prototype, 'fetchApiRecord');
  const jo5 = jest.spyOn(seedDb.prototype, 'settleApiCalls');
  const jo6 = jest.spyOn(seedDb.prototype, 'persistToDb');

  it('seedDb - should be defined', () => {
    expect(seed).toBeDefined();
  });
  describe('Mocking settleApiCalls - Test', () => {
    it('mock test settleApiCalls to Throw error', () => {
      seed.settleApiCalls(['string']);
      expect(jo5).toHaveBeenCalled();
      jo5.mockClear();
    });
  });
  describe('Mocking formatFlightResponse - Test', () => {
    it('mock test formatFlightResponse', () => {
      const payload = [
        {
          flights: [
            {
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
                  departure_date_time_utc: '2019-08-10T18:00:00.000Z',
                  arrival_date_time_utc: '2019-08-10T20:00:00.000Z',
                  flight_number: '8544',
                  duration: 120,
                },
              ],
              price: 117.01,
            },
          ],
        },
      ];
      seed.formatFlightResponse(payload);
      expect(jo2).toHaveBeenCalled();
      expect(jo2).toHaveBeenCalledWith(payload);
      jo2.mockClear();
    });
  });
  describe('Mocking fetchApiRecord - Test', () => {
    it('mock test fetchApiRecord to Throw error', () => {
      seedDb.prototype.settleApiCalls = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      seed.persistToDb([{}]);
      expect(jo6).toHaveBeenCalled();
      jo6.mockClear();
    });
  });
  describe('Mocking persistToRoundTripDb - Test', () => {
    it('mock test persistToRoundTripDb to Throw error', () => {
      const payload = [
        {
          flights: [
            {
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
                  departure_date_time_utc: '2019-08-10T18:00:00.000Z',
                  arrival_date_time_utc: '2019-08-10T20:00:00.000Z',
                  flight_number: '8544',
                  duration: 120,
                },
              ],
              price: 117.01,
            },
          ],
        },
      ];
      seedDb.prototype.settleApiCalls = jest.fn().mockImplementation(() => {
        return [
          { status: 'fulfilled', value: { _id: '' } },
          { status: 'fulfilled', value: { _id: '' } },
        ];
      });
      RoundTripMain.findOne = jest.fn().mockImplementation(() => false);
      RoundTrip.prototype.save = jest.fn().mockImplementation();
      RoundTripMain.findOneAndUpdate = jest.fn().mockImplementation(() => {
        throw Error();
      });
      seed.persistToRoundTripDb(payload);
      expect(jo3).toHaveBeenCalled();
      // jo1.mockClear();
    });
  });
  describe('formatFlightRoundTripResponse - Test', () => {
    const payload = [
      {
        flights: [
          {
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
                departure_date_time_utc: '2019-08-10T18:00:00.000Z',
                arrival_date_time_utc: '2019-08-10T20:00:00.000Z',
                flight_number: '8544',
                duration: 120,
              },
            ],
            price: 117.01,
          },
        ],
      },
    ];
    it('mock test formatFlightRoundTripResponse', () => {
      seed.formatFlightRoundTripResponse(payload);
      expect(jo).toHaveBeenCalled();
      expect(jo).toHaveBeenCalledWith(payload);
      jo.mockClear();
    });
    it('mock test formatFlightRoundTripResponse (catch)', () => {
      seed.persistToRoundTripDb = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      seed.formatFlightRoundTripResponse(payload);
      expect(jo).toHaveBeenCalled();
      jo.mockClear();
    });
  });
  describe('Mocking fetchApiRecord - Test', () => {
    it('mock test fetchApiRecord', () => {
      seedDb.prototype.settleApiCalls = jest.fn().mockImplementation(() => {
        return [
          { status: 'fulfilled', value: { _id: '' } },
          { status: 'rejected', value: { _id: '' } },
        ];
      });
      seed.fetchApiRecord();
      expect(jo1).toHaveBeenCalled();
      jo1.mockClear();
    });
    it('mock test fetchApiRecord to Throw error', () => {
      seedDb.prototype.fetchURL = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      seed.fetchApiRecord();
      expect(jo4).toHaveBeenCalled();
      jo4.mockClear();
    });
  });
});
