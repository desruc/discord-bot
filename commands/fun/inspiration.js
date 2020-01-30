const quotes = require("../../data/quotes");

const inspirationalQuote = async (client, message, args) => {
  const channel = message.channel;
  const rand = Math.ceil(
    Math.random() * (quotes.inspirationalQuotes.length - 1)
  );
  const quote = quotes.inspirationalQuotes[rand];
  channel.send(quote);
};

module.exports = {
  name: "inspiration",
  category: "fun",
  description: "Return an inspirational quote.",
  run: inspirationalQuote
};
