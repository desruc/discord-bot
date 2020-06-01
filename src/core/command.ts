import { Client, Message } from 'discord.js';
import { ICommand } from '../typings';

import { commandDefaults } from '../constants/defaults';

export default class Command implements ICommand {
  public active = true;
  public name: string;
  public category: string;
  public cooldown: number = commandDefaults.cooldown;
  public description: string;
  public guildOnly = false;
  public aliases: string[] = [];

  public async exec(
    client: Client,
    message: Message,
    args: string[]
  ): Promise<Message | Array<Message> | void> {
    console.log('Message contents: ', message.content);
    console.log('Arguments: ', args);
  }
}
