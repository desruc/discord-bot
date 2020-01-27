const kick = require("../commands/kick");
const arnie = require("../commands/arnie");
const jokes = require("../commands/joke");
const roll = require("../commands/roll");
const say = require("../commands/say");
const squad = require("../commands/squad");
const meme = require("../commands/meme");

module.exports = (client, message) => {
  if (message.author.bot) return;

  const prefix = "arnie";
  if (message.content.toLowerCase().indexOf(prefix) !== 0) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "quote") {
    return arnie(message);
  }

  if (command === "inspiration") {
    return arnie("inspiration", message);
  }

  if (command === "movie") {
    return arnie("movie", quote);
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
