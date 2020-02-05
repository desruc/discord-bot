const schedule = require("node-schedule");
const { RichEmbed } = require("discord.js");
const got = require("got");

const { memeMessages } = require("../data/quotes");
const { randomNumber } = require("../functions");

const morningMeme = async client => {
  // Grab the first text channel available
  const { id: channelId } = client.channels
    .filter(({ type }) => type === "text")
    .last();
  const channel = client.channels.get(channelId);

  // Grab a meme from /r/dankmemes
  const embed = new RichEmbed();
  const response = await got("https://www.reddit.com/r/dankmemes/random/.json");
  const result = JSON.parse(response.body);
  const image = result[0].data.children[0].data.url;
  embed.setImage(image);

  // Grab a random good morning message
  embed.setTitle(memeMessages[randomNumber(memeMessages.length)]);
  channel.send(embed);
};

module.exports = client => {
  // Post a meme to the channel at 8.30 every morning
  schedule.scheduleJob("30 8 * * *", function() {
    morningMeme(client);
  });
};
