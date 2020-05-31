import Command from '../core/command';
import { MessageEmbed } from 'discord.js';
import axios from 'axios';

import { randomNumber } from '../utils/helpers';

export default class RedditCommand extends Command {
  public sub: string;
  public redditMeta: boolean;
  public title: string;
  public isImage: boolean;

  constructor() {
    super();
    this.guildOnly = false;
  }

  public async getRedditMediaEmbed(
    sub: string,
    title: string = null,
    image = true,
    redditMeta = false
  ): Promise<MessageEmbed> {
    const response = await axios.get(
      `https://www.reddit.com/r/${sub}/top/.json?limit=99&t=week`
    );

    const rawPosts = response.data.data.children;

    const posts = image
      ? rawPosts.filter((p) => p.data.post_hint === 'image')
      : rawPosts;

    const rand = randomNumber(0, posts.length - 1);
    const chosenPost = posts[rand];

    // Trim the title if too long
    const redditTitle =
      chosenPost.data.title.length > 256
        ? `${chosenPost.data.title.slice(0, 253)}...`
        : chosenPost.data.title;

    const embed: MessageEmbed = new MessageEmbed().setColor('RANDOM');

    if (image) embed.setImage(chosenPost.data.url);
    else embed.setTitle(redditTitle);

    if (title && !redditMeta) embed.setTitle(title);

    if (redditMeta) {
      embed
        .setTitle(redditTitle)
        .setURL(`https://www.reddit.com${chosenPost.data.permalink}`)
        .setFooter(`👍 ${chosenPost.data.ups} | 💬 ${chosenPost.data.num_comments}`);
    }

    return embed;
  }
}
