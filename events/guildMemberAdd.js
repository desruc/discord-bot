const generateGreetings = require("../data/quotes");

module.exports = (client, member) => {
  const channel = member.guild.channels.find(ch => ch.name === "general");
  if (!channel) return;

  const greetings = generateGreetings(member);
  const rand = Math.ceil(Math.random() * (selections.length + 1));
  channel.send(greetings[rand]);
};
