const got = require("got");

const { randomNumber } = require("../functions");

// Store the URL so it doesn't post the same meme
const postedMemeUrls = [];

// Get a meme from /r/dankmemes
const getMemeImgUrl = async () => {
  try {
    const response = await got(
      "https://www.reddit.com/r/dankmemes/top/.json?limit=50&t=week"
    );
    const result = JSON.parse(response.body);
    const redditPosts = result.data.children;

    // Loop through the posts and find one that is an image and hasn't been posted previously
    const image = redditPosts.find(post => {
      const postUrl = post.data.url;
      const isImage = postUrl.includes(".jpg") || postUrl.includes(".png") || postUrl.includes(".gif");
      const isNew = postedMemeUrls.every(url => url !== postUrl);

      // Basic title check to see if it is meme of the month voting post
      const notMoMVote = !post.data.title
        .toLowerCase()
        .includes("meme of the month");

      return isImage && isNew && notMoMVote;
    });

    if (image) {
      // We store 50 images - the hot posts should be fully refreshed by then
      if (postedMemeUrls.length > 49) {
        postedMemeUrls.splice(0, postedMemeUrls.length);
      }

      // Add the new meme to postedMemeUrls array
      const newMemeUrl = image.data.url;
      postedMemeUrls.push(newMemeUrl);
      return newMemeUrl;
    } else return null;
  } catch (error) {
    throw error;
  }
};

// Store user Id and amount of times they've requested a meme
let usersRequestedMeme = [];

// Stop users requesting memes after two requests
const canUserRequestMeme = id => {
  const userMemeRecord = usersRequestedMeme.find(user => user.id === id);
  if (userMemeRecord) {
    if (userMemeRecord.memes === 2) return false;
    userMemeRecord.memes += 1;
    usersRequestedMeme = usersRequestedMeme.map(record => {
      if (record.id === id) return userMemeRecord;
      return record;
    });
    return true;
  } else {
    usersRequestedMeme = [...usersRequestedMeme, { id, memes: 1 }];
    return true;
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
const clearUsersRequestedMeme = () => (usersRequestedMeme = []);

module.exports = {
  getMemeImgUrl,
  clearUsersRequestedMeme,
  canUserRequestMeme,
  noMoreMemesQuotes
};
