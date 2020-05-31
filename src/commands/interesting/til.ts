import RedditCommand from '../../core/redditCommand';
import { Client, Message } from 'discord.js';

export default class TodayILearned extends RedditCommand {
  constructor() {
    super();
    this.name = 'til';
    this.sub = 'todayilearned';
  }

  public async exec(
    client: Client,
    message: Message
  ): Promise<Message | Array<Message> | void> {
    const { channel } = message;

    const embed = await this.getRedditMediaEmbed(this.sub, null, false, true, true);
    return channel.send(embed);
  }
}
