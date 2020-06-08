import RedditCommand from '../../core/redditCommand';

export default class ShowerThought extends RedditCommand {
  constructor() {
    super();
    this.name = 'showerthought';
    this.sub = 'showerthoughts';
    this.isImage = false;
    this.redditMeta = false;
    this.category = 'memes';
  }
}
