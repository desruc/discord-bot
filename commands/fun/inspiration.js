const quotes = require("../../constants/quotes");
const { randomNumber } = require("../../functions");

const inspirationalQuote = async (client, message, args) => {
  const channel = message.channel;
  const rand = randomNumber(quotes.inspirationalQuotes.length);
  const quote = quotes.inspirationalQuotes[rand];
  channel.send(quote);
};

module.exports = {
  name: "inspiration",
  category: "fun",
  description: "returns an inspirational quote.",
  run: inspirationalQuote
};
