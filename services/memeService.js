const got = require("got");

const Meme = require("../database/models/memeModel");
const User = require("../database/models/userModel");

const { randomNumber, getUserDatabaseRecord } = require("../functions");

// Get a meme from /r/dankmemes
const getMemeImgUrl = async () => {
  try {
    const response = await got(
      "https://www.reddit.com/r/dankmemes/top/.json?limit=50&t=week"
    );
    const result = JSON.parse(response.body);
    const redditPosts = result.data.children;

    // Grab all urls from database
    const postedMemeUrls = await Meme.find({});

    // Loop through the posts and find one that is an image and hasn't been posted previously
    const image = redditPosts.find(post => {
      const postUrl = post.data.url;
      const isImage =
        postUrl.includes(".jpg") ||
        postUrl.includes(".png") ||
        postUrl.includes(".gif");

      // Check the image doesn't exist in the database
      const isNew = postedMemeUrls.every(doc => doc.url !== postUrl);

      // Basic title check to see if it is meme of the month voting post
      const notMoMVote = !post.data.title
        .toLowerCase()
        .includes("meme of the month");

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
    "Try again tomorrow, punk.",
    "*pretends not to hear you*",
    `*slaps* ${member}`,
    "Maybe tomorrow... *seductively blows kiss*",
    "*skrts off in the whip*",
    `${member}, give it a break...`,
    `${member}, don't kill my vibe...`,
    `${member}, you're really testing my patience.`,
    `Nope - you didn't say thankyou last time.`,
    `smd fuccboi`,
    "Have you ever heard of reddit?"
  ];
  return quotes[randomNumber(quotes.length)];
};

// Clear all records
const clearUsersRequestedMeme = async () => {
  await User.updateMany({}, { memesRequested: 0 });
};

module.exports = {
  getMemeImgUrl,
  clearUsersRequestedMeme,
  canUserRequestMeme,
  noMoreMemesQuotes
};
