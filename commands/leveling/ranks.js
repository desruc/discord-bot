const { getBotChannel } = require('../../utils/helpers');
const { getRankInfoCard } = require('../../services/levelingService');

const ranks = async (client, message) => {
  try {
    const { channel, guild } = message;
    const botChannel = await getBotChannel(guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const embed = getRankInfoCard();

    return botChannel.send(embed);
  } catch (error) {
    console.error('ranks -> error', error);
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(`Sorry ${message.author}! I couldn't grab the rank records.`);
  }
};

module.exports = {
  name: 'ranks',
  category: 'leveling',
  description: 'shows the ranks and the experience required',
  run: ranks
};
