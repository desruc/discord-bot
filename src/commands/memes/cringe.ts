import RedditCommand from '../../core/redditCommand';
import { Client, Message } from 'discord.js';

export default class Dank extends RedditCommand {
  constructor() {
    super();
    this.name = 'cringe';
    this.sub = 'cringepics';
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
