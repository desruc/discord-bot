const { getStatCard } = require('../../services/robotService');
const { getBotChannel } = require('../../helpers');

const robot = async (client, message, args, userRecord) => {
  try {
    const { channel } = message;
    const botChannel = await getBotChannel(message.guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const statCard = await getStatCard(message, args, userRecord);
    return botChannel.send(statCard);
  } catch (error) {
    console.error('Error getting robot stat card: ', error);
    const { author } = message;
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(
      `Sorry ${author}! There was an error retrieving your robots stats...`
    );
  }
};

module.exports = {
  name: 'robot',
  category: 'robots',
  description: 'returns the users robot stat card',
  run: robot
};
