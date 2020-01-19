const kick = require("../commands/kick");
const arnie = require("../commands/arnie");
const jokes = require("../commands/joke");

module.exports = (client, message) => {
  if (message.content.startsWith("!kick")) {
    return kick(message);
  }

  if (message.content.toLowerCase() === "arnie, what do you think?") {
    return arnie(message);
  }

  if (message.content.toLowerCase() === "!inspirational") {
    return arnie('inspiration', message);
  }

  
  if (message.content.toLowerCase() === "!movie") {
    return arnie('movie', message);
  }

  if (message.content.toLowerCase() === "joke plz") {
    return jokes(message);
  }

  if (message.content.toLowerCase() === "!help") {
    return message.channel.send(`Of course you'd want help... Sissy!`)
  }
};
