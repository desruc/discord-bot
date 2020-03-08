const { getStockCard } = require("../../services/robotService");

const { getBotChannel } = require("../../helpers");

const stock = async (client, message, args) => {
  try {
    const botChannel = await getBotChannel(message.guild);

    if (message.deletable) {
      message.delete();
    }

    const stockCard = getStockCard();
    botChannel.send(stockCard);
  } catch (error) {
    console.error("Error getting stock: ", error);
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(`${author}, The shop is closed until further notice`);
  }
};

module.exports = {
  name: "stock",
  category: "robots",
  description: "returns the current stock",
  aliases: ["shop"],
  run: stock
};
