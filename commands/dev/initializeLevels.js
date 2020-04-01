const { initializeLevelRoles } = require('../../services/levelingService');

const addLevelRoles = async (client, message) => {
  const { author, guild } = message;
  if (author.id === guild.owner.id) {
    try {
      await initializeLevelRoles();
      return message.reply('the leveling roles have been created');
    } catch (error) {
      console.log('Error initializing level roles: ', error);
      message.reply('Sorry mate! There was an eror.');
    }
  }
};

module.exports = {
  name: 'initlevelingsystem',
  run: addLevelRoles
};
