const quotes = require("../data/arnieQuotes");

module.exports = message => {
  const channel = message.channel;
  const index = Math.floor(Math.random() * quotes.length);
  channel.send(quotes[index]);
};
