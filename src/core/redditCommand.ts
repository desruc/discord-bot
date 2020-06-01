import Command from '../core/command';
import { MessageEmbed, Client, Message } from 'discord.js';
import axios from 'axios';

import { randomNumber } from '../utils/helpers';

export default class RedditCommand extends Command {
  public sub: string;
  public redditMeta = true;
  public title: string;
  public isImage = true;
  public thumbnail = false;

  private async getRedditMediaEmbed(): Promise<MessageEmbed> {
    const response = await axios.get(
      `https://www.reddit.com/r/${this.sub}/top/.json?limit=99&t=week`
    );

    const rawPosts = response.data.data.children;

    const posts = this.isImage
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

    if (this.isImage) embed.setImage(chosenPost.data.url);
    else embed.setTitle(redditTitle);

    if (this.title && !this.redditMeta) embed.setTitle(this.title);

    if (this.redditMeta) {
      embed
        .setTitle(redditTitle)
        .setURL(`https://www.reddit.com${chosenPost.data.permalink}`)
        .setFooter(`👍 ${chosenPost.data.ups} | 💬 ${chosenPost.data.num_comments}`);
    }

    if (this.thumbnail) embed.setThumbnail(chosenPost.data.thumbnail);

    return embed;
  }

  public async exec(
    client: Client,
    message: Message
  ): Promise<Message | Array<Message> | void> {
    const { channel } = message;

    const embed = await this.getRedditMediaEmbed();
    return channel.send(embed);
  }
}
