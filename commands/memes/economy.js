const { getRedditMediaEmbed } = require('../../services/memeService');
const { updateCooldown } = require('../../utils/cooldownHelpers');

const economy = async (client, message, args, userRecord) => {
  try {
    const { channel } = message;
    await updateCooldown(userRecord, command);
    const msg = await channel.send("Okay, I'll grab something for ya...");
    const embed = await getRedditMediaEmbed('MemeEconomy');
    msg.edit(embed);
  } catch (error) {
    console.error('Error getting memeeconomy meme: ', error);
    message.channel.send('Sorry! The meme economy seems to be in a recession...');
  }
};

const command = {
  name: 'economy',
  category: 'memes',
  aliases: ['memeeconomy', 'memee'],
  description: 'See what memes are worth investing in',
  cooldown: 60 * 60 * 1000,
  run: economy
};

module.exports = command;
