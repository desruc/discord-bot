require("dotenv").config();
const fs = require("fs");
const { Client, Collection } = require("discord.js");

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

// Initialize system files
fs.readdir("./system/", (err, files) => {
  files.forEach(file => {
    require(`./system/${file}`)(client);
  });
});

// Initialize event handlers
fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    const handler = require(`./events/${file}`);
    const event = file.split(".")[0];
    client.on(event, arg => handler(client, arg));
  });
});

client.login(process.env.TOKEN);
