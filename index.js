require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();

// Initialize event handlers
fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    const handler = require(`./events/${file}`);
    const event = file.split(".")[0];
    client.on(event, arg => handler(client, arg));
  });
});

client.login(process.env.TOKEN);
