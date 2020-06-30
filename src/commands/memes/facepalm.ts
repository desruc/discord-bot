import RedditCommand from '../../core/redditCommand';
import Bot from '../../core/bot';

export default class Dank extends RedditCommand {
  constructor(client: Bot) {
    super(client);
    this.name = 'facepalm';
    this.sub = 'facepalm';
    this.category = 'memes';
  }
}
