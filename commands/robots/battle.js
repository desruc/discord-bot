const { simulateFight } = require('../../services/robotService');
const { getBotChannel } = require('../../helpers');

const battle = async (client, message, args, userRecord) => {
  try {
    const { channel } = message;
    const botChannel = await getBotChannel(message.guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    // All logic is handle within the robot service
    await simulateFight(message, userRecord);
  } catch (error) {
    console.error('Error with fight: ', error);
    const botChannel = await getBotChannel(message.guild);
    const { author } = message;
    botChannel.send(
      `It is with great displeasure that I have to cancel the battle. I am sorry, ${author}.`
    );
  }
};

module.exports = {
  name: 'battle',
  category: 'robots',
  description: 'send your robot to battle another',
  aliases: ['fight', 'duel'],
  usage: '[mention]',
  cooldown: 180 * 60 * 1000,
  cooldownMessage: 'your robots still being patched up...',
  showCooldown: true,
  example: 'arnie battle @user',
  run: battle
};
