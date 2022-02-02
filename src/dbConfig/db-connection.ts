import mongoose, { ConnectOptions } from 'mongoose';
import config from 'config';

mongoose.Promise = global.Promise;
const url: string =
  config.get('app.environment') === 'developent'
    ? config.get('databases.mongodb.url')
    : config.get('databases.mongodb.test');

const connectToDatabase = async (): Promise<void> => {
  await mongoose.connect(url, () => {
    return {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
  });
};

export { connectToDatabase };
