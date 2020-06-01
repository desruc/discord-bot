import Bot from '../core/bot';
import { IEvent } from '../typings';

export default class ReadyEvent implements IEvent {
  readonly name = 'ready';

  constructor(private client: Bot) {}

  public exec(): void {
    this.client.logger.info(
      `Logged in as ${this.client.user.tag} and ready to serve!`
    );
  }
}
