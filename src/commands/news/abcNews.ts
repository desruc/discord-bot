import { Client, Message, MessageEmbed } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';

import axios from 'axios';

import env from '../../constants/env';

export default class AbcNews extends Command {
  constructor(client: Bot) {
    super(client);
    this.name = 'abcnews';
    this.category = 'news';
    this.guildOnly = true;
    this.description = 'returns the top headlines from https://www.abc.net.au/';
  }

  public async exec(
    client: Client,
    message: Message
  ): Promise<Message | Array<Message> | void> {
    try {
      const {
        data: { articles, totalResults }
      } = await axios.get(
        `https://newsapi.org/v2/top-headlines?sources=abc-news-au&apiKey=${env.newsApiKey}`
      );

      const computedArticles = totalResults > 10 ? articles.slice(0, 10) : articles;

      const embed = new MessageEmbed().setColor('RANDOM');

      embed.setTitle('Top Headlines');

      computedArticles.forEach((a) => {
        embed.addField(a.title, `<${a.url}>`);
      });

      message.channel.send(embed);
    } catch (error) {
      this.client.logger.error(error);
    }
  }
}
