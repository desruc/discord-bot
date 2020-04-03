const axios = require('axios');
const { updateCooldown } = require('../../utils/cooldownHelpers');

const joke = async (client, message, args, userRecord) => {
  const { channel } = message;
  try {
    const msg = await channel.send('Hold up, just thinking of a good one...');
    await updateCooldown(userRecord, command);
    const {
      data: { joke }
    } = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        'User-Agent': 'Discord Bot (https://github.com/desruc/discord-bot)',
        Accept: 'application/json'
      }
    });
    msg.edit(joke);
  } catch (error) {
    console.error('Error with joke command: ', error);
    channel.send("Apologies. I'm all outta jokes right now.");
  }
};

const command = {
  name: 'joke',
  aliases: ['pun'],
  category: 'memes',
  description: 'Dad jokes are fun!',
  cooldown: 10000,
  run: joke
};

module.exports = command;
