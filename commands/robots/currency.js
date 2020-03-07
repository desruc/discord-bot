const showCurrency = async (client, message, args, userRecord) => {
  const { currency } = userRecord;
  message.reply(`you have $${currency}!`);
};

module.exports = {
  name: "currency",
  category: "robots",
  description: "returns the users gold",
  aliases: ["gold", "cheddar", "bank"],
  run: showCurrency
};
