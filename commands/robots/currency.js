const { getBotChannel } = require("../../helpers");

const showCurrency = async (client, message, args, userRecord) => {
  try {
    const { author } = message;
    const botChannel = await getBotChannel(message.guild);

    if (message.deletable) {
      message.delete();
    }

    const { currency } = userRecord;
    botChannel.send(`${author}, you have $${currency}!`);
  } catch (error) {
    const { author } = message;
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(`Sorry ${author}, there was a problem at the bank...`);
  }
};

module.exports = {
  name: "currency",
  category: "robots",
  description: "returns the users gold",
  aliases: ["gold", "cheddar", "bank"],
  run: showCurrency
};
