const schedule = require("node-schedule");
const { RichEmbed } = require("discord.js");
const got = require("got");

const { memeMessages } = require("../data/quotes");
const { randomNumber } = require("../functions");

// Store the URL so it doesn't post the same meme
const postedMemeUrls = [];

const morningMeme = async client => {
  // Grab the first text channel available
  const { id: channelId } = client.channels
    .filter(({ type }) => type === "text")
    .first();
  const channel = client.channels.get(channelId);

  try {
    // Grab a list of current hot memes
    const embed = new RichEmbed();
    const response = await got("https://www.reddit.com/r/dankmemes/hot/.json");
    const result = JSON.parse(response.body);
    const redditPosts = result.data.children;

    // Loop through the posts and find one that is an image and hasn't been posted previously
    const image = redditPosts.find(post => {
      const postUrl = post.data.url;
      const isImage = postUrl.includes(".jpg") || postUrl.includes(".png");
      const isNew = postedMemeUrls.every(url => url !== postUrl);
      return isImage && isNew;
    });

    if (image) {
      // We store seven images - the hot posts should have refreshed after a week
      // Once we hit seven - remove them all and start again
      if (postedMemeUrls.length > 6) {
        postedMemeUrls.splice(0, postedMemeUrls.length);
      };

      // Add the new meme to postedMemeUrls array
      const newMemeUrl = image.data.url;
      postedMemeUrls.push(newMemeUrl);

      // Send it to the channel
      embed.setImage(newMemeUrl);
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
};
