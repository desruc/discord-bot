import { Client, Message } from 'discord.js';
import Command from '../../core/command';
import Bot from '../../core/bot';

export default class Noot extends Command {
  constructor(client: Bot) {
    super(client);
    this.name = 'noot';
    this.category = 'fun';
  }

  public async exec(client: Client, message: Message): Promise<void> {
    message.reply('noot!');
  }
}
