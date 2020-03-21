const axios = require('axios');
const { RichEmbed } = require('discord.js');

const Meme = require('../database/models/memeModel');
const User = require('../database/models/userModel');

const { randomNumber } = require('../helpers');
const { memeMessages } = require('../constants/quotes');

// Get a meme from /r/dankmemes
const getMemeImgUrl = async () => {
  try {
    const response = await axios.get(
      'https://www.reddit.com/r/dankmemes/top/.json?limit=50&t=week'
    );
    const redditPosts = response.data.data.children;

    // Grab all urls from database
    const postedMemeUrls = await Meme.find({});

    // Loop through the posts and find one that is an image and hasn't been posted previously
    const image = redditPosts.find(post => {
      const postUrl = post.data.url;
      const isImage =
        postUrl.includes('.jpg') ||
        postUrl.includes('.png') ||
        postUrl.includes('.gif');

      // Check the image doesn't exist in the database
      const isNew = postedMemeUrls.every(doc => doc.url !== postUrl);

      // Basic title check to see if it is meme of the month voting post
      const notMoMVote = !post.data.title
        .toLowerCase()
        .includes('meme of the month');

      return isImage && isNew && notMoMVote;
    });

    if (image) {
      const newMemeUrl = image.data.url;

      // Save the url in the database so it doesn't get posted again
      await new Meme({
        url: newMemeUrl
      }).save();

      return newMemeUrl;
    } else return null;
  } catch (error) {
    console.error('Error getting meme img url: ', error);
    throw error;
  }
};

// Stop users requesting memes after two requests
const canUserRequestMeme = async userRecord => {
  try {
    const { memesRequested } = userRecord;

    if (memesRequested === 2) return false;

    await userRecord.updateOne({ memesRequested: memesRequested + 1 });

    return true;
  } catch (error) {
    console.error('Error checking if user can request meme: ', error);
    throw error;
  }
};

// Generate a response if they've already requested two
const noMoreMemesQuotes = member => {
  const quotes = [
    `Sorry ${member}, I'm cutting you off...`,
    `I'm not your slave, find your own damn memes!`,
    `Nah, I'm saving these for the rest of the channel.`,
    `It's on cooldown!`,
    'Try again tomorrow, punk.',
    '*pretends not to hear you*',
    `*slaps* ${member}`,
    'Maybe tomorrow... *seductively blows kiss*',
    '*skrts off in the whip*',
    `${member}, give it a break...`,
    `${member}, don't kill my vibe...`,
    `${member}, you're really testing my patience.`,
    `Nope - you didn't say thankyou last time.`,
    `smd fuccboi`,
    'Have you ever heard of reddit?'
  ];
  return quotes[randomNumber(0, quotes.length - 1)];
};

// Clear all records
const clearUsersRequestedMeme = async () => {
  await User.updateMany({}, { memesRequested: 0 });
};

// Post a meme from the hot section of /r/dankmemes
const morningMeme = async client => {
  // Grab the first text channel available
  const { id: channelId } = client.channels
    .filter(({ type }) => type === 'text')
    .first();
  const channel = client.channels.get(channelId);

  try {
    const embed = new RichEmbed();

    const memeUrl = await getMemeImgUrl();

    if (memeUrl) {
      embed.setImage(memeUrl);
      embed.setTitle(memeMessages[randomNumber(0, memeMessages.length - 1)]);
      channel.send(embed);
    } else {
      // There were no posts in the hot post list that haven't been posted before
      channel.send("No good memes today folks. I'll be back... tomorrow");
    }
  } catch (error) {
    console.info('morningMeme error: ', error);
    channel.send('Sorry guys! There was an error retrieving your morning meme...');
  }
};

module.exports = {
  getMemeImgUrl,
  clearUsersRequestedMeme,
  canUserRequestMeme,
  noMoreMemesQuotes,
  morningMeme
};
