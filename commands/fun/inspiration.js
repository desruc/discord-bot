const { inspirationalQuotes } = require("../../constants/quotes");
const { randomNumber } = require("../../helpers");

const inspiration = async (client, message, args) => {
  const { channel } = message;
  const quote = inspirationalQuotes[randomNumber(inspirationalQuotes.length)];
  channel.send(quote);
};

module.exports = {
  name: "inspiration",
  category: "fun",
  description: "returns an inspirational quote.",
  run: inspiration
};
