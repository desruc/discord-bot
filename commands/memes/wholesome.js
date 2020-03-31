const { getRedditMediaEmbed } = require('../../services/memeService');

const wholesome = async (client, message) => {
  try {
    const { channel } = message;
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

module.exports = {
  name: 'wholesome',
  category: 'memes',
  aliases: ['wholesomememe'],
  description: 'enjoy a meme you can feel good laughing at...',
  cooldown: 60 * 60 * 1000,
  run: wholesome
};
