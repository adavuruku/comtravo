import app from '../../app';
import supertest from 'supertest';
import { connect, disconnect } from '../../dbConfig/dbConnection';
let server: any;
jest.setTimeout(1000);
describe('Test find flight', () => {
  beforeAll(async () => {
    await connect();
    server = supertest(await app);
  });

  it('Should find all flights', async () => {
    const response = await server.get('/v1/flight').expect(200);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toBeInstanceOf(Object);
    const { price } = response.body.data[0];
    expect(response.body.data[0]).toBeInstanceOf(Object);
    expect(price).toBeGreaterThan(0);
  }, 10000);

  it('Should find all round trip flights', async () => {
    const response = await server.get('/v1/flight/round-trip').expect(200);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toBeInstanceOf(Object);
    const price = response.body.data[0].price;
    expect(response.body.data[0].slice[0]).toBeInstanceOf(Object);
    expect(price).toBeGreaterThan(0);
  }, 10000);
});
