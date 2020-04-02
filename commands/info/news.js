// const axios = require('axios');
// const { RichEmbed } = require('discord.js');
// const { stripIndents } = require('common-tags');
// const { getBotChannel } = require('../../helpers');

// const news = async (client, message) => {
//   try {
//     const result = await axios.get(
//       `http://newsapi.org/v2/top-headlines?country=au?pageSize=5?apiKey=${process.env.NEWS_API_KEY}`
//     );
//     const { articles } = result;

//     const embed = new RichEmbed();

//     articles.forEach((article, idx) => {
//       embed.addField(
//         `** Article ${idx + 1}**:`,
//         stripIndents`Title: ${article.title}
//         URL: ${article.url}`,
//         false
//       );
//     });

//     const botChannel = getBotChannel(message.guild);
//     botChannel.send(embed);
//   } catch (error) {
//     const { author } = message;
//     const botChannel = getBotChannel(message.guild);
//     botChannel.send(`Sorry ${author}! I couldn't get the news...`);
//   }
// };

// module.exports = {
//   name: 'news',
//   category: 'info',
//   description: 'returns current top news articles.',
//   run: news
// };
