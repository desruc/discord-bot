const axios = require('axios');
const { RichEmbed } = require('discord.js');

const { randomNumber, getBaseChannel } = require('../helpers');
const { memeMessages } = require('../constants/quotes');

const getRedditMediaEmbed = async (sub, title = null) => {
  const response = await axios.get(
    `https://www.reddit.com/r/${sub}/top/.json?limit=99&t=week`
  );
  const rawPosts = response.data.data.children;

  // Filter out non images
  const posts = rawPosts.filter(p => p.data.post_hint === 'image');

  // TODO: Check for duplicate posts
  const rand = randomNumber(0, posts.length - 1);
  const chosenPost = posts[rand];

  const embed = new RichEmbed().setImage(chosenPost.data.url);

  if (title) embed.setTitle(title);

  return embed;
};

const morningMeme = async client => {
  // Get the base server channel
  const channel = await getBaseChannel(client);

  try {
    // Pick a random subreddit and title
    const memeSubs = ['dankmemes', 'memeeconomy', 'wholesomememes'];
    const sub = memeSubs[randomNumber(0, 2)];
    const title = memeMessages[randomNumber(0, memeMessages.length - 1)];

    // Create the embed and send to base channel
    const embed = getRedditMediaEmbed(sub, title);
    channel.send(embed);
  } catch (error) {
    console.info('morningMeme error: ', error);
    channel.send('Sorry guys! There was an error retrieving your morning meme...');
  }
};

module.exports = {
  morningMeme,
  getRedditMediaEmbed
};
