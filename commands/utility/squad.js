const squad = async (client, message, args) => {
  const { channel } = message;

  if (message.deletable) message.delete();

  if (args.length) {
    const game = args.join(' ');
    return channel.send(
      `@here It's time to pony up ladies! We are about to play - ${game}`
    );
  }

  return channel.send(`@here SQQQUUUAAADDD! Get in chat. It's time to party...`);
};

module.exports = {
  name: 'squad',
  category: 'utility',
  description: 'the bot will message the channel calling for action.',
  usage: '[game]',
  example: 'arnie squad Dota 2',
  run: squad
};
