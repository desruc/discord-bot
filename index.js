require('dotenv').config();
const fs = require('fs');
const { Client, Collection } = require('discord.js');

const { initializeDb } = require('./core/dbConfig');
const { syncCommands, initializeEvents } = require('./core/system');
const scheduledTasks = require('./tasks');

const initializeBot = async () => {
  await initializeDb();

  const client = new Client();
  client.commands = new Collection();
  client.aliases = new Collection();
  client.categories = fs.readdirSync('./commands/');

  // Initialize system files
  syncCommands(client);
  initializeEvents(client);

  client.login(process.env.DISCORD_TOKEN);

  scheduledTasks(client);
};

initializeBot();
