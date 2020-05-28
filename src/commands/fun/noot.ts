import { Message } from 'discord.js';
import Command from '../../core/command';

export default class Noot extends Command {
  constructor() {
    super();
    this.name = 'noot';
  }

  public async process(msg: Message): Promise<void> {
    msg.reply('noot!');
  }
}
