import RedditCommand from '../../core/redditCommand';
import Bot from '../../core/bot';

export default class TodayILearned extends RedditCommand {
  constructor(client: Bot) {
    super(client);
    this.name = 'til';
    this.sub = 'todayilearned';
    this.thumbnail = true;
    this.isImage = false;
    this.category = 'random';
  }
}
