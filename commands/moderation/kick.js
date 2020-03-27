const kick = async (client, message) => {
  const member = message.mentions.members.first();

  if (!member) {
    return message.reply(`C'mon sissy! You didn't specify a user`);
  }

  return message.channel.send(`Nice try, asshole! ${member} is here to stay`);
};

module.exports = {
  name: 'kick',
  aliases: ['terminate'],
  category: 'moderation',
  description: 'attempts to kick the mentioned user',
  usage: '[mention]',
  run: kick
};
