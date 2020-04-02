const setStatus = async (client, message, args) => {
  try {
    const { author, guild, member } = message;
    const modRole = guild.roles.find(r => r.name === process.env.MOD_ROLE);

    const game = args.join(' ');

    if (author.id === guild.owner.id || member.roles.has(modRole.id)) {
      await client.user.setGame(game);
    }

    return message.reply('my status has been updated.');
  } catch (error) {
    console.error('setStatus -> error', error);
  }
};

module.exports = {
  name: 'setstatus',
  run: setStatus
};
