import { connect, disconnect } from './dbConnection';
import Mongoose from 'mongoose';

jest.clearAllMocks();
describe('Mocking DBConnection - Test', () => {
  const jo = jest.spyOn(Mongoose, 'connect');
  it('mock test connection', async () => {
    Mongoose.connect = jest.fn().mockImplementation(() => {
      return;
    });

    // await Mongoose.connect('mongoose');

    const y = await connect();
    expect(Mongoose.connect).toBeCalled();
  });
  it('mock test disconnection', async () => {
    Mongoose.disconnect = jest.fn().mockImplementation(() => {
      return;
    });

    // await Mongoose.connect('mongoose');

    await disconnect();
    expect(Mongoose.disconnect).toBeCalled();
  });
});
