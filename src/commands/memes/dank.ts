import RedditCommand from '../../core/redditCommand';

export default class Dank extends RedditCommand {
  constructor() {
    super();
    this.name = 'dank';
    this.sub = 'dankmemes';
    this.category = 'memes';
  }
}
