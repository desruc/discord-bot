const { getRedditMediaEmbed } = require('../../services/memeService');

const facepalm = async (client, message) => {
  try {
    const { channel } = message;
    const msg = await channel.send('Okay hold plz!');
    const embed = await getRedditMediaEmbed('facepalm');
    msg.edit(embed);
  } catch (error) {
    console.error('Error getting a facepalm post: ', error);
    message.channel.send(
      "My apologies! There was an error and you won't be facepalming today..."
    );
  }
};

module.exports = {
  name: 'facepalm',
  category: 'memes',
  description: 'Things that are so dumb, you have to facepalm',
  cooldown: 60 * 60 * 1000,
  run: facepalm
};
