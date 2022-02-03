import app from '../../app';
import supertest from 'supertest';
import { connect, disconnect } from '../../dbConfig/dbConnection';
let server: any;
describe('Test find flight', () => {
  beforeAll(async () => {
    await connect();
    server = supertest(await app);
  });

  it('Should find all flights', async () => {
    const response = await server.get('/flight/all').expect(200);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toBeInstanceOf(Object);
    const {
      price,
      origin_name,
      destination_name,
      departure_date_time_utc,
      arrival_date_time_utc,
      flight_number,
      duration,
    } = response.body.data[0];
    expect(response.body.data[0]).toBeInstanceOf(Object);
    expect(price).toBeGreaterThan(0);
  });

  afterAll(async () => {
    //close db
    await disconnect();
  });
});
