import Mongoose from 'mongoose';
import config from 'config';
import mongoose from 'mongoose';
// import { UserModel } from './users/users.model';
let database: Mongoose.Connection;
export const connect = async () => {
  // add your own uri below
  // console.log("config.get('app.environment')", config.get('app.environment'));
  const uri: string =
    config.get('app.environment') === 'development'
      ? config.get('databases.mongodb.dev')
      : config.get('databases.mongodb.test');

  if (database) {
    return;
  }
  Mongoose.connect(uri, () => {
    return {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
  });
  database = Mongoose.connection;
  // database.once('open', async () => {
  //   console.log('Connected to database');
  // });
  // database.on('error', (error) => {
  //   console.log('Error connecting to database', error);
  // });
};
export const disconnect = async () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
