import RedditCommand from '../../core/redditCommand';
import Bot from '../../core/bot';

export default class ShowerThought extends RedditCommand {
  constructor(client: Bot) {
    super(client);
    this.name = 'showerthought';
    this.sub = 'showerthoughts';
    this.isImage = false;
    this.redditMeta = false;
    this.category = 'memes';
  }
}
