import request from 'supertest';
import app from '../app';
import config from 'config';
import supertest from 'supertest';
import { disconnect } from '../dbConfig/dbConnection';
let server: any;
describe('Test Server Running', () => {
  beforeAll(async () => {
    server = supertest(await app);
  });

  it('should respond with a 200 status code', async () => {
    const response = await server.get('/v1');
    expect(response.statusCode).toBe(200);
  });

  it('should respond with a 404 status code', async () => {
    const response = await server.get('/');
    expect(response.statusCode).toBe(404);
  });
});
