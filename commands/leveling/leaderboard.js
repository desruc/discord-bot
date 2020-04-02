const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

const { getLevelLeaderboard } = require('../../services/levelingService');
const { getBotChannel, getMember } = require('../../utils/helpers');

const leaderboard = async (client, message) => {
  try {
    const botChannel = await getBotChannel(message.guild);

    const { channel } = message;
    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    const results = await getLevelLeaderboard();
    const embed = new RichEmbed()
      .setColor('RANDOM')
      .setTitle(`Experience Leaderboard`);

    const emoji = {
      1: '🏆',
      2: '2️⃣nd place',
      3: '3️⃣rd place',
      4: '4️⃣th place',
      5: '5️⃣th place'
    };

    results.forEach((doc, idx) => {
      const position = idx + 1;
      embed.addField(
        `** ${emoji[position]}**`,
        stripIndents`user: ${getMember(message, doc.userId)}
          exp: ${doc.experience}`,
        false
      );
    });

    return botChannel.send(embed);
  } catch (error) {
    console.error('leaderboard -> error', error);
    const botChannel = await getBotChannel(message.guild);
    botChannel.send(
      `Sorry ${message.author}! I can't get the leaderboard right now`
    );
  }
};

module.exports = {
  name: 'leaderboard',
  category: 'leveling',
  description: 'Find out who the most active users are',
  aliases: ['xp'],
  run: leaderboard
};
