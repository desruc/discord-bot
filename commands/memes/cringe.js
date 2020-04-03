const { getRedditMediaEmbed } = require('../../services/memeService');
const { updateCooldown } = require('../../utils/cooldownHelpers');

const cringe = async (client, message, args, userRecord) => {
  try {
    const { channel } = message;
    const msg = await channel.send('*tips fedora* just fetching something now...');
    await updateCooldown(userRecord, command);
    const embed = await getRedditMediaEmbed('cringepics');
    msg.edit(embed);
  } catch (error) {
    console.error('Error getting a cringe: ', error);
    message.channel.send("I couldn't find any cringe... Try again later.");
  }
};

const command = {
  name: 'cringe',
  category: 'memes',
  description: 'It hurts to look...',
  cooldown: 60 * 60 * 1000,
  run: cringe
};

module.exports = command;
