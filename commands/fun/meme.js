const { RichEmbed } = require("discord.js");
const got = require("got");

const meme = async (client, message, args) => {
  const embed = new RichEmbed();
  const response = await got("https://www.reddit.com/r/dankmemes/random/.json");
  const result = JSON.parse(response.body);
  const image = result[0].data.children[0].data.url;
  embed.setImage(image);
  message.channel.send(embed);
};

module.exports = {
  name: "meme",
  category: "fun",
  description: "Grabs a random meme from /r/dankmemes",
  run: meme
};
