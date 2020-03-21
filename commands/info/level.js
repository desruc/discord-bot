const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const {
  getUserLevelInfo,
  getLevelLeaderboard
} = require('../../services/levelingService');
const { getBotChannel, getMember } = require('../../helpers');

const level = async (client, message, args, userRecord) => {
  try {
    const botChannel = await getBotChannel(message.guild);

    const { author, channel } = message;
    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    if (args[0] === 'leaderboard') {
      const results = await getLevelLeaderboard();
      const embed = new RichEmbed()
        .setColor('RANDOM')
        .setTitle(`Experience Leaderboard`);

      results.forEach((doc, idx) => {
        embed.addField(
          `** ${idx + 1}**:`,
          stripIndents`user: ${getMember(message, doc.userId)}
          exp: ${doc.experience}`,
          true
        );
      });

      return botChannel.send(embed);
    }

    const userDetails = await getUserLevelInfo(userRecord);
    const { currentLevel, experience, expToNextLevel } = userDetails;
    botChannel.send(
      `${author}, you are currently level ${currentLevel} and have ${experience} EXP! You need ${expToNextLevel} EXP to level up.`
    );
  } catch (error) {
    console.error('level -> error', error);
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(`Sorry ${message.author}! I can't get your record right now`);
  }
};

module.exports = {
  name: 'level',
  category: 'info',
  description: 'returns the users experience.',
  aliases: ['xp'],
  run: level
};
