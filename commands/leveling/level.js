const { getUserLevelInfo } = require('../../services/levelingService');
const { getBotChannel, getMember } = require('../../utils/helpers');
const { getUserDatabaseRecord } = require('../../utils/databaseHelpers');

const level = async (client, message, args, userRecord) => {
  try {
    const botChannel = await getBotChannel(message.guild);

    const { author, channel } = message;
    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const user = getMember(message, args.join(" "));

    let record = userRecord;
    const isAuthor = user.id === author.id;
    if (!isAuthor) record = await getUserDatabaseRecord(user.id);

    const userDetails = await getUserLevelInfo(record);
    const { currentLevel, experience, expToNextLevel } = userDetails;
    return botChannel.send(
      isAuthor
        ? `${user}, you are currently level ${currentLevel} and have ${experience} EXP! You need ${expToNextLevel} EXP to level up.`
        : `${user} is currently level ${currentLevel} and has ${experience} EXP!`
    );
  } catch (error) {
    console.error('level -> error', error);
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(`Sorry ${message.author}! I can't get your record right now`);
  }
};

module.exports = {
  name: 'level',
  category: 'leveling',
  description: "check your (or another users) experience level",
  usage: '[user | id | mention]',
  example: 'arnie level OR arnie level legend27',
  run: level
};
