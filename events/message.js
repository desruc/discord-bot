const kick = require("../commands/kick");
const arnie = require("../commands/arnie");
const jokes = require("../commands/joke");
const roll = require("../commands/roll");
const say = require("../commands/say");
const squad = require("../commands/squad");
const meme = require("../commands/meme");
const who = require("../commands/who");

module.exports = async (client, message) => {
  const prefix = "arnie";
  // If the author is a bot, return
  if (message.author.bot) return;
  // If the message was not sent in the server, return
  if (!message.guild) return;
  // If the message doesn't start with the prefix, return
  if (message.content.toLowerCase().indexOf(prefix) !== 0) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const msg = await message.channel.send(`🏓 Pinging....`);
    msg.edit(
      `🏓 Pong!\nLatency is ${Math.floor(
        msg.createdTimestamp - message.createdTimestamp
      )}ms\nAPI Latency is ${Math.round(client.ping)}ms`
    );
    console.log(msg.createdTimestap)
    console.log(message.createdTimestap)
  }

  if (command === 'who') {
    return who(client, message, args);
  }

  if (command === "quote") {
    return arnie(message);
  }

  if (command === "inspiration") {
    return arnie("inspiration", message);
  }

  if (command === "movie") {
    return arnie("movie", message);
  }

  if (command === "joke") {
    return jokes(message);
  }

  if (command === "roll") {
    const num = args[0] || 100;
    return roll(message, num);
  }

  if (command === "kick") {
    return kick(message);
  }

  if (command === "say") {
    return say(message, args);
  }

  if (command === "squad") {
    return squad(message, args);
  }

  if (command === "meme") {
    return meme(message);
  }
};
