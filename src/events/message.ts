import Bot from '../core/bot';
import { Event } from '../core/eventHandler';
import { Message } from 'discord.js';

export default class MessageEvent implements Event {
  readonly name = 'message';

  constructor(private client: Bot) {}

  public exec(message: Message): any {
    // Ignore messages from bot
    if (message.author.bot) return;

    // No prefix - no comprende
    const {
      config: { prefix }
    } = this.client;
    if (message.content.toLowerCase().indexOf(prefix) !== 0) return;

    return this.client.commandHandler.handleCommand(message);
  }
}
