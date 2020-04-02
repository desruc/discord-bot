const { generateGreetings } = require('../constants/quotes');
const { randomNumber } = require('../utils/helpers');

module.exports = (client, member) => {
  const channel = member.guild.channels.find(ch => ch.name === 'bunnings');
  if (!channel) return;

  const greetings = generateGreetings(member);
  const rand = randomNumber(0, greetings.length - 1);
  channel.send(greetings[rand]);
};
