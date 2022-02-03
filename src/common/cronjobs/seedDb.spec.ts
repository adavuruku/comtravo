import { seedDb } from './seedDb';

// jest.mock('./seedDb');
// const fetchURL = jest.fn(async () => ({
//   records: [{ get: () => [] }],
// }));

// class seedDbMock {
//   fetchURL = jest.fn(async () => {
//     return Promise.resolve();
//   });
//   scheduleJobToFetchApi = jest.fn(async () => {
//     return Promise.resolve();
//   });
//   fetchApiRecord = jest.fn(async () => {
//     return Promise.resolve();
//   });
// }
jest.clearAllMocks();
describe('Mocking SeedDb - Test', () => {
  const seed = new seedDb();
  const jo = jest.spyOn(seedDb.prototype, 'scheduleJobToFetchApi');
  const jo1 = jest.spyOn(seedDb.prototype, 'fetchApiRecord');
  const jo2 = jest.spyOn(seedDb.prototype, 'formatFlightResponse');
  const jo3 = jest.spyOn(seedDb.prototype, 'resolvePromise');

  // .mockImplementation(() => Promise.resolve([]));

  it('seedDb - should be defined', () => {
    expect(seed).toBeDefined();
  });

  it('moc test scheduleJobToFetchApi', () => {
    seed.scheduleJobToFetchApi();
    expect(jo).toHaveBeenCalled();
    jo.mockClear();
  });
  it('mock test fetchApiRecord', () => {
    seed.fetchApiRecord();
    expect(jo1).toHaveBeenCalled();
    jo1.mockClear();
  });

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

  it('mock test resolvePromise', () => {
    const payload = [
      {
        status: 'fulfilled',
        value: { data: {} },
      },
      {
        status: 'rejected',
        value: {},
      },
    ];
    seed.resolvePromise(payload);
    expect(jo3).toHaveBeenCalledWith(payload);
    // expect(jo3).toHaveBeenCalled();
    jo3.mockClear();
  });

  it('mock test fetchApiRecord to Throw error', () => {
    seed.fetchApiRecord = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    expect(seed.fetchApiRecord).toThrow();
    // jo1.mockClear();
  });
});
