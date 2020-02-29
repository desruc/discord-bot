const mongoose = require("mongoose");

const nodeEnv = process.env.NODE_ENV;

const mongoUser = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB;

let url = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoHost}-ebmxw.mongodb.net/${dbName}?retryWrites=true&w=majority`;

if (nodeEnv === "development") {
  url = `mongodb://${mongoHost}:${mongoPort}`;
}

const initializeDb = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  return await mongoose.connect(url, options, err => {
    if (err) {
      console.error("Error connecting to database", err);
    } else {
      console.info("Database connection established");
    }
  });
};

module.exports = {
  initializeDb
};
