const got = require("got");
const Discord = require("discord.js");

module.exports = async msg => {
  const embed = new Discord.RichEmbed();
  const response = await got("https://www.reddit.com/r/dankmemes/random/.json");
  const result = JSON.parse(response.body);
  const image = result[0].data.children[0].data.url;
  embed.setImage(image);
  msg.channel.send(embed);
};
