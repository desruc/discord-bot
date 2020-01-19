const quotes = require("../data/quotes");

const allQuotes = () => {
  const allQuotes = [...quotes.movieQuotes, ...quotes.inspirationalQuotes];
  const rand = Math.ceil(Math.random() * (allQuotes.length + 1));
  return allQuotes[rand];
};

const movieQuote = () => {
  const rand = Math.ceil(Math.random() * (quotes.movieQuotes.length + 1));
  return quotes.movieQuotes[rand];
};

const inspirationalQuote = () => {
  const rand = Math.ceil(
    Math.random() * (quotes.inspirationalQuotes.length + 1)
  );
  return quotes.inspirationalQuotes[rand];
};

module.exports = (type, message) => {
  const channel = message.channel;

  switch (type) {
    case "movie":
      return channel.send(movieQuote());

    case "inspiration":
      return channel.send(inspirationalQuote());

    default:
      return channel.send(allQuotes());
  }
};
