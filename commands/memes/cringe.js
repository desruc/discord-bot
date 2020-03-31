const { getRedditMediaEmbed } = require('../../services/memeService');

const cringe = async (client, message) => {
  try {
    const { channel } = message;
    const msg = await channel.send('*tips fedora* just fetching something now...');
    const embed = await getRedditMediaEmbed('cringepics');
    msg.edit(embed);
  } catch (error) {
    console.error('Error getting a cringe: ', error);
    message.channel.send("I couldn't find any cringe... Try again later.");
  }
};

module.exports = {
  name: 'cringe',
  category: 'memes',
  description: 'It hurts to look...',
  cooldown: 60 * 60 * 1000,
  run: cringe
};
