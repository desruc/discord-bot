const { initializeLevelRoles } = require('../../services/levelingService');
const { initializeShopDatabase } = require('../../services/robotService');

const initializeBotServices = async (client, message) => {
  const { author, guild } = message;
  if (author.id === guild.owner.id) {
    try {
      await initializeLevelRoles();
      await message.reply('the leveling roles have been created');
      await initializeShopDatabase();
      await message.reply('the robot shop items have been initialized');
    } catch (error) {
      console.log('Error initializing services: ', error);
      message.reply('Sorry mate! There was an eror.');
    }
  }
};

module.exports = {
  name: 'initbotservices',
  run: initializeBotServices
};
