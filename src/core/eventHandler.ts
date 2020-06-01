import { readdirSync } from 'fs';
import { resolve } from 'path';
import Bot from './bot';
import { Event } from '../typings';

export default class EventHandler {
  constructor(public client: Bot) {
    return;
  }

  public initializeEvents(): Bot {
    const eventFiles: string[] = readdirSync(`${__dirname}/../events/`);
    const eventPath = resolve(__dirname, '..', 'events');
    for (const eventFile of eventFiles) {
      const event: Event = new (require(`${eventPath}/${eventFile}`).default)(
        this.client
      );
      this.client.on(event.name, (...args) => event.exec(...args));
    }
    return this.client;
  }
}
