import RedditCommand from '../../core/redditCommand';
import { Client, Message, MessageEmbed } from 'discord.js';

export default class ListenToThis extends RedditCommand {
  constructor() {
    super();
    this.name = 'listentothis';
    this.sub = 'listentothis';
    this.thumbnail = false;
    this.isImage = false;
    this.category = 'random';
  }

  public async exec(
    client: Client,
    message: Message
  ): Promise<Message | Array<Message> | void> {
    const { channel } = message;
    const song = await this.getOmbed(['bandcamp', 'youtube']);
    await channel.send(song);
  }
}
