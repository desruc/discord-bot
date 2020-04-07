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
    let amount = 0;
    let responseMessage = '';

    if (chance === 1) {
      // Bingo!
      amount = randomNumber(5000, 10000);
      responseMessage = `You know what, ${author}? I'm feeling generous... here's $${amount}!`;
    } else if (chance <= 30) {
      // Fail
      responseMessage = `Are you that broke, ${author}? Get outta here and ask me again in an hour...`;
    } else if (chance > 30 && chance < 65) {
      amount = randomNumber(1, 200);
      responseMessage = `Alright ${author}, here's $${amount} because I feel bad for ya.`;
    } else if (chance > 65 && chance < 90) {
      amount = randomNumber(300, 500);
      responseMessage = `I found $${amount} in my back pocket. Keep it.`;
    } else if (chance >= 90) {
      amount = randomNumber(500, 700);
      responseMessage = `$${amount} comin' your way! Stay frosty ${author}.`;
    }

    if (amount > 0) await updateCurrency(userRecord, amount);

    botChannel.send(responseMessage);
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
  cooldown: 60 * 60 * 1000,
  cooldownMessage: 'I told you to wait an hour!',
  showCooldown: true,
  description: '... literally beg for cash',
  run: beg
};

module.exports = command;
