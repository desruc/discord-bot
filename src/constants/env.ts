const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoHost: process.env.MONGO_HOST || 'localhost',
  mongoPort: process.env.MONGO_PORT || '27017',
  dbName: process.env.MONGO_DB,
  newsApiKey: process.env.NEWS_API_KEY
};

export default env;
