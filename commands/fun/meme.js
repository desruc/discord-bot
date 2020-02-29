const { RichEmbed } = require("discord.js");

const {
  canUserRequestMeme,
  noMoreMemesQuotes,
  getMemeImgUrl
} = require("../../services/memeService");

const meme = async (client, message, args) => {
  try {
    const channel = message.channel;
    const authorId = message.author.id;
    const canRequest = await canUserRequestMeme(authorId);

    if (canRequest) {
      const memeUrl = await getMemeImgUrl();
      if (memeUrl) {
        const embed = new RichEmbed();
        embed.setImage(memeUrl);
        channel.send(embed);
      } else {
        channel.send("Todays meme pool yields no more. Try again tomorrow.");
      }
    } else {
      // User has requested two memes today
      message.channel.send(noMoreMemesQuotes(message.author));
    }
  } catch (error) {
    console.info("meme error: ", error);
    channel.send("My apologies! There was an error retrieving the meme...");
  }
};

module.exports = {
  name: "meme",
  category: "fun",
  description: "returns a random meme from /r/dankmemes",
  run: meme
};
