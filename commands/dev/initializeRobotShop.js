const { initializeShopDatabase } = require('../../services/robotService');

const initializeRobotShop = async (client, message) => {
  const { author, guild } = message;
  console.log('hey')
  if (author.id === guild.owner.id) {
    try {
      await initializeShopDatabase();
      return message.reply('the shop is open for business!');
    } catch (error) {
      console.log('Error initializing shop: ', error);
      message.reply('Sorry mate! There was an eror.');
    }
  }
};

module.exports = {
  name: 'initrobotshop',
  run: initializeRobotShop
};
