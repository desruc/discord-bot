const { getRedditMediaEmbed } = require('../../services/memeService');

const dank = async (client, message) => {
  try {
    const { channel } = message;
    const msg = await channel.send("Alright lemme see what I've got...");
    const embed = await getRedditMediaEmbed('dankmemes');
    msg.edit(embed);
  } catch (error) {
    console.error('Error getting a dank meme: ', error);
    message.channel.send('My apologies! There was an incident at the meme farm...');
  }
};

module.exports = {
  name: 'dank',
  category: 'memes',
  aliases: ['meme'],
  description: 'Only the dankest memes here',
  cooldown: 60 * 60 * 1000,
  run: dank
};
