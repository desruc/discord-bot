import mongoose from 'mongoose';
import env from '../../constants/env';

const { mongoUser, mongoPassword, mongoHost, mongoPort, dbName, nodeEnv } = env;

let url = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoHost}-ebmxw.mongodb.net/${dbName}?retryWrites=true&w=majority`;

if (nodeEnv === 'development') {
  url = `mongodb://${mongoHost}:${mongoPort}`;
}

const initializeDb = async (): Promise<mongoose> => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };

  return await mongoose.connect(url, options, (err: Error) => {
    if (err) {
      console.error('Error connecting to database', err);
    } else {
      console.info('Database connection established');
    }
  });
};

export default initializeDb;
