const kick = require("../commands/kick");
const arnie = require("../commands/arnie");

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
};
