const { RichEmbed } = require("discord.js");

module.exports = (message, args) => {
  console.log("TCL: args", args)
  if (message.deletable) message.delete();

  if (!args.length > 0) return message.reply('Nothing to say?').then(m => m.delete(5000));

  
  if (args[0].toLowerCase() === 'embed') {
    const roleColor = message.guild.me.highestRole.hexColor;

    const embed = new RichEmbed()
      .setDescription(args.slice(1).join(" "))
      .setColor(roleColor)

    message.channel.send(embed);
  } else {
    message.channel.send(args.join(" "));
  }
};
