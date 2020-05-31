import RedditCommand from '../../core/redditCommand';
import { Client, Message } from 'discord.js';

export default class Dank extends RedditCommand {
  constructor() {
    super();
    this.name = 'facepalm';
    this.sub = 'facepalm';
  }

  public async exec(
    client: Client,
    message: Message
  ): Promise<Message | Array<Message> | void> {
    const { channel } = message;

    const embed = await this.getRedditMediaEmbed(this.sub, null, true);
    return channel.send(embed);
  }
}
