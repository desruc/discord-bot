const quotes = require("../data/quotes");

module.exports = message => {
  const channel = message.channel;
  const allQuotes = [...quotes.movieQuotes, ...quotes.movieQuotes];
  const rand = Math.ceil(Math.random() * (selections.length + 1));
  channel.send(allQuotes[rand]);
};
