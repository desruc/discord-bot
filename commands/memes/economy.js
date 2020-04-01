const { getRedditMediaEmbed } = require('../../services/memeService');

const economy = async (client, message) => {
  try {
    const { channel } = message;
    const msg = await channel.send("Okay, I'll grab something for ya...");
    const embed = await getRedditMediaEmbed('MemeEconomy');
    msg.edit(embed);
  } catch (error) {
    console.error('Error getting memeeconomy meme: ', error);
    message.channel.send('Sorry! The meme economy seems to be in a recession...');
  }
};

module.exports = {
  name: 'economy',
  category: 'memes',
  aliases: ['memeeconomy', 'memee'],
  description: 'See what memes are worth investing in',
  cooldown: 60 * 60 * 1000,
  run: economy
};
