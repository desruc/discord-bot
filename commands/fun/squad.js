const squad = async (client, message, args) => {
  const channel = message.channel;
  const msg = args[0]
    ? `@here It's time to pony up ladies! We are about to play - ${args[0]}`
    : `@here SQQQUUUAAADDD! Get in chat. It's time to party...`;
  return channel.send(msg);
};

module.exports = {
  name: "squad",
  category: "fun",
  description: "The bot will message the channel calling for action.",
  usage: "[game]",
  run: squad
};
