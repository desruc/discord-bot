const { getUserCurrency } = require("../../services/currencyService");

const showCurrency = async (client, message, args) => {
  try {
    const { author } = message;
    const currency = await getUserCurrency(author.id);
    message.reply(`you have ${currency} gold!`);
  } catch (error) {
    console.info("showCurrency error: ", error);
    message.reply("my apologies... I ran into trouble at the bank.");
  }
};

module.exports = {
  name: "currency",
  category: "fun",
  description: "returns the users gold",
  aliases: ["gold", "cheddar", "bank"],
  run: showCurrency
};
