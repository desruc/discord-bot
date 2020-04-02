const { RichEmbed } = require('discord.js');
const { getBaseChannel } = require('../../utils/helpers');

const say = async (client, message, args) => {
  if (message.deletable) message.delete();

  if (!args.length > 0)
    return message.reply('Nothing to say?').then(m => m.delete(5000));

  if (message.channel.name === process.env.MOD_CHANNEL) {
    message.delete();
    const channel = await getBaseChannel(client);
    return channel.send(args.join(' '));
  }

  if (args[0].toLowerCase() === 'embed') {
    const roleColor = message.guild.me.highestRole.hexColor;

    const embed = new RichEmbed()
      .setDescription(args.slice(1).join(' '))
      .setColor(roleColor);

    message.channel.send(embed);
  } else {
    message.channel.send(args.join(' '));
  }
};

module.exports = {
  name: 'say',
  category: 'utility',
  description: 'the bot repeats the message and delete the original',
  run: say
};
