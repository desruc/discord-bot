import RedditCommand from '../../core/redditCommand';
import { Client, Message } from 'discord.js';

export default class ShowerThought extends RedditCommand {
  constructor() {
    super();
    this.name = 'showerthought';
    this.sub = 'showerthoughts';
  }

  public async exec(
    client: Client,
    message: Message
  ): Promise<Message | Array<Message> | void> {
    const { channel } = message;

    const embed = await this.getRedditMediaEmbed(
      'showerthoughts',
      null,
      false,
      false
    );
    return channel.send(embed);
  }
}
