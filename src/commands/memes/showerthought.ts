import RedditCommand from '../../core/redditCommand';

export default class ShowerThought extends RedditCommand {
  constructor() {
    super();
    this.name = 'showerthought';
    this.sub = 'showerthoughts';
    this.redditMeta = false;
  }
}
