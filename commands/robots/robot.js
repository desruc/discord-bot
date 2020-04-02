const { getStatCard } = require('../../services/robotService');
const { getBotChannel, getMember } = require('../../utils/helpers');
const { getUserDatabaseRecord } = require('../../utils/databaseHelpers');

const robot = async (client, message, args, userRecord) => {
  try {
    const { channel, author } = message;
    const botChannel = await getBotChannel(message.guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const user = getMember(message, args.join(" "));

    let record = userRecord;
    const isAuthor = user.id === author.id;
    if (!isAuthor) record = await getUserDatabaseRecord(user.id);

    const statCard = await getStatCard(user, record);
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
  description: 'check out your (or someone elses) robots stats',
  usage: '[user | id | mention]',
  run: robot
};
