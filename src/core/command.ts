import { Client, Message } from 'discord.js';
import { CommandInterface } from '../types';

import { commandDefaults } from '../constants/defaults';

export default class Command implements CommandInterface {
  public active: boolean;
  public name: string;
  public category: string;
  public cooldown: number;
  public description: string;
  public guildOnly: boolean;

  constructor() {
    this.active = true;
    this.guildOnly = true;
    this.cooldown = commandDefaults.cooldown;
  }

  public async process(
    client: Client,
    message: Message,
    args: string[]
  ): Promise<Message | Array<Message> | void> {
    console.log('Message contents: ', message.content);
    console.log('Arguments: ', args);
  }
}
