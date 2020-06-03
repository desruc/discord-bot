import RedditCommand from '../../core/redditCommand';

export default class Dank extends RedditCommand {
  constructor() {
    super();
    this.name = 'wholesome';
    this.sub = 'wholesomememes';
    this.category = 'memes';
  }
}
