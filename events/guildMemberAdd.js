const { generateGreetings } = require("../constants/quotes");
const { randomNumber } = require("../helpers");

module.exports = (client, member) => {
  const channel = member.guild.channels.find(ch => ch.name === "bunnings");
  if (!channel) return;

  const greetings = generateGreetings(member);
  const rand = randomNumber(greetings.length);
  channel.send(greetings[rand]);
};
