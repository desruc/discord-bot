import Bot from '../core/bot';
import { Event } from '../typings';

export default class ReadyEvent implements Event {
  readonly name = 'ready';

  constructor(private client: Bot) {}

  public exec(): void {
    console.log('Ready to serve!');
  }
}
