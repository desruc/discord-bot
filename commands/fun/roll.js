const { checkNumber, randomNumber } = require('../../helpers');

const roll = async (client, message, args) => {
  const { channel, member } = message;
  const num = Number(args[0]) || 100;

  if (!checkNumber(num)) return channel.send("Yeah, that isn't a number...");

  if (num <= 1) return channel.send('Nice try...');

  const rand = randomNumber(1, num);
  channel.send(`${member} rolls ${rand} (1-${num})`);
};

module.exports = {
  name: 'roll',
  category: 'fun',
  description:
    'returns a random number between 1 and 100 (or the number specified).',
  usage: '[number]',
  example: 'arnie roll 666',
  run: roll
};
