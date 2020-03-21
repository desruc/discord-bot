const { RichEmbed } = require('discord.js');

const {
  canUserRequestMeme,
  noMoreMemesQuotes,
  getMemeImgUrl
} = require('../../services/memeService');

const meme = async (client, message, args, userRecord) => {
  try {
    const { channel } = message;
    const canRequest = await canUserRequestMeme(userRecord);

    if (canRequest) {
      const msg = await channel.send("Alright lemme see what I've got...");
      const memeUrl = await getMemeImgUrl();
      if (memeUrl) {
        const embed = new RichEmbed();
        embed.setImage(memeUrl);
        msg.edit(embed);
      } else {
        msg.edit('Todays meme pool yields no more. Try again tomorrow.');
      }
    } else {
      // User has requested two memes today
      channel.send(noMoreMemesQuotes(message.author));
    }
  } catch (error) {
    console.error('Error with meme command: ', error);
    message.channel.send('My apologies! There was an error retrieving the meme...');
  }
};

module.exports = {
  name: 'meme',
  category: 'fun',
  description: 'returns a random meme from /r/dankmemes',
  run: meme
};
