import RedditCommand from '../../core/redditCommand';
import { Client, Message } from 'discord.js';

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
    const placeholder = await channel.send(
      'Just fetching something now... please hold.'
    );
    const song = await this.getOmbed(['bandcamp', 'youtube']);
    return placeholder.edit(song);
  }
}
