module.exports = {
  name: "kick",
  category: "moderation",
  description: "Attempts to kick the mentioned user",
  usage: "[mention]",
  run: async (client, message, args) => {
    if (!message.guild) return;

    const author = message.author;
    const member = message.mentions.members.first();

    if (!member) {
      return message.reply(`C'mon sissy! You didn't specify a user`);
    }

    if (!member.kickable) {
      return message.channel.send(
        `Nice try, asshole! ${member} is here to stay`
      );
    }

    return message.channel.send(`Nice try, asshole! ${member} is here to stay`);
  }
};
