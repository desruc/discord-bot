module.exports = (client, member) => {
  const channel = member.guild.channels.find(ch => ch.name === "general");
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}!`);
};
