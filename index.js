require('dotenv').config();
const fs = require('fs');
const { Client, Collection } = require('discord.js');

const { initializeDb } = require('./database/dbConfig');
const scheduledTasks = require('./tasks');

const initializeBot = async () => {
  await initializeDb();

  // Initialize system files
  fs.promises.readdir('./system/', (err, files) => {
    files.forEach(file => {
      require(`./system/${file}`)(client);
    });
  });

  const client = new Client();
  client.commands = new Collection();
  client.aliases = new Collection();
  client.categories = fs.readdirSync('./commands/');

  // Initialize event handlers
  fs.promises.readdir('./events/', (err, files) => {
    files.forEach(file => {
      const handler = require(`./events/${file}`);
      const event = file.split('.')[0];
      client.on(event, arg => handler(client, arg));
    });
  });

  client.login(process.env.DISCORD_TOKEN);

  scheduledTasks(client);
};

initializeBot();
