import mongoose from 'mongoose';
import env from '../constants/env';
import Bot from '../core/bot';

const { mongoUser, mongoPassword, mongoHost, mongoPort, dbName, nodeEnv } = env;

let url = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoHost}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

if (nodeEnv === 'development') {
  url = `mongodb://${mongoHost}:${mongoPort}`;
}

const initializeDb = async (client: Bot): Promise<any> => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000
  };

  return await mongoose.connect(url, options, (err: Error) => {
    if (err) {
      client.logger.error('Error connecting to database: ', err);
      process.exit(1);
    } else {
      client.logger.info('Database connection established');
    }
  });
};

export default initializeDb;
