const {
  getStockCard,
  updateStock,
  getStock
} = require('../../services/robotService');

const { getBotChannel } = require('../../helpers');

const shop = async (client, message) => {
  try {
    const { channel } = message;
    const botChannel = await getBotChannel(message.guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    // Stock hasn't been initialized - make it so
    if (getStock().length === 0) {
      const updated = await updateStock();
      if (!updated)
        return botChannel.send(
          'The Robot system has not been initialized. Talk to your administrator.'
        );
    }

    const stockCard = getStockCard();
    botChannel.send(stockCard);
  } catch (error) {
    console.error('Error getting stock: ', error);
    const botChannel = await getBotChannel(message.guild);
    const { author } = message;
    botChannel.send(`${author}, The shop is closed until further notice`);
  }
};

module.exports = {
  name: 'shop',
  category: 'robots',
  description: 'returns the current shop',
  aliases: ['stock'],
  run: shop
};
