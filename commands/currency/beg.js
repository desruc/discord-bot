const { randomNumber, getBotChannel } = require('../../utils/helpers');
const { updateCurrency } = require('../../services/currencyService');
const { updateCooldown } = require('../../utils/cooldownHelpers');

const beg = async (client, message, args, userRecord) => {
  try {
    const { author, channel } = message;
    const botChannel = await getBotChannel(message.guild);

    if (channel !== botChannel && message.deletable) {
      message.delete();
    }

    await updateCooldown(userRecord, command);

    const chance = randomNumber(1, 100);

    const success = chance <= 3;
    if (success) {
      const amount = randomNumber(5000, 10000);
      await updateCurrency(userRecord, amount);
      return botChannel.send(
        `You know what, ${author}? I'm feeling generous... here's $${amount}!`
      );
    } else {
      return botChannel.send(
        'has it really come to this? begging for cash? get outta here!'
      );
    }
  } catch (error) {
    console.error('beg -> error', error);
    const { guild } = message;
    const botChannel = await getBotChannel(guild);
    botChannel.send('Uh oh! Looks like theres a bug in the beg command...');
  }
};

const command = {
  name: 'beg',
  category: 'currency',
  cooldown: 180 * 60 * 1000,
  cooldownMessage: "stop begging me! I won't change my mind",
  description: '... literally beg for cash',
  run: beg
};

module.exports = command;
