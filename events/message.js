const kick = require("../commands/kick");
const arnie = require("../commands/arnie");

module.exports = (client, message) => {
  if (message.content.startsWith("!kick")) {
    return kick(message);
  }
  if (message.content.toLowercase() === "arnie, what do you think?") {
    return arnie(message);
  }
};
