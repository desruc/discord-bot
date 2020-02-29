const schedule = require("node-schedule");
const { RichEmbed } = require("discord.js");

const { memeMessages } = require("../constants/quotes");
const { randomNumber } = require("../functions");

const { getMemeImgUrl, clearUsersRequestedMeme } = require('../services/memeService');

// Post a meme from the hot section of /r/dankmemes
const morningMeme = async client => {
  // Grab the first text channel available
  const { id: channelId } = client.channels
    .filter(({ type }) => type === "text")
    .first();
  const channel = client.channels.get(channelId);

  try {
    const embed = new RichEmbed();

    const memeUrl = await getMemeImgUrl();

    if (memeUrl) {
      embed.setImage(memeUrl);
      embed.setTitle(memeMessages[randomNumber(memeMessages.length)]);
      channel.send(embed);
    } else {
      // There were no posts in the hot post list that haven't been posted before
      channel.send("No good memes today folks. I'll be back... tomorrow");
    }

  } catch (error) {
    console.info("morningMeme error: ", error);
    channel.send(
      "Sorry guys! There was an error retrieving your morning meme..."
    );
  }
};

module.exports = client => {
  // Post a meme to the channel at 8.30 every morning
  const meme = schedule.scheduleJob("30 8 * * *", function() {
    console.info(`morningMeme will next run at ${meme.nextInvocation()}`);
    morningMeme(client);
  });

  console.info(`the first morningMeme will run at ${meme.nextInvocation()}`);

  // Clear the usersRequestedMeme record daily at 1am - only two memes per day
  const clearMemeRecords = schedule.scheduleJob("* 1 * * *", function() {
    clearUsersRequestedMeme();
  });

  console.info(`the first clearMemeRecords will run at ${clearMemeRecords.nextInvocation()}`);
};
