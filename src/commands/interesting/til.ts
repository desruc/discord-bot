import RedditCommand from '../../core/redditCommand';

export default class TodayILearned extends RedditCommand {
  constructor() {
    super();
    this.name = 'til';
    this.sub = 'todayilearned';
    this.thumbnail = true;
    this.isImage = false;
    this.category = 'info';
  }
}
