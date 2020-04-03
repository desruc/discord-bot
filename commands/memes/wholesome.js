const { getRedditMediaEmbed } = require('../../services/memeService');
const { updateCooldown } = require('../../utils/cooldownHelpers');

const wholesome = async (client, message, args, userRecord) => {
  try {
    const { channel } = message;
    await updateCooldown(userRecord, command);
    const msg = await channel.send('One wholesome meme coming up!');
    const embed = await getRedditMediaEmbed('wholesomememes');
    msg.edit(embed);
  } catch (error) {
    console.error('Error getting a wholesome meme: ', error);
    message.channel.send(
      'Tis a sad day... There was an error retrieving the wholesome meme.'
    );
  }
};

const command = {
  name: 'wholesome',
  category: 'memes',
  aliases: ['wholesomememe'],
  description: 'enjoy a wholesome meme that you can feel good laughing at...',
  cooldown: 60 * 60 * 1000,
  run: wholesome
};

module.exports = command;
