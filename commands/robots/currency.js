const showCurrency = async (client, message, args, userRecord) => {
  const { currency } = userRecord;
  message.reply(`you have $${currency}!`);
};

module.exports = {
  name: "currency",
  category: "fun",
  description: "returns the users gold",
  aliases: ["gold", "cheddar", "bank"],
  run: showCurrency
};
