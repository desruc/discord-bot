import { Client, Message } from 'discord.js';
import Bot from './bot';
import { ICommand } from '../typings';

export default class Command implements ICommand {
  public active = true;
  public name: string;
  public category: string;
  public cooldown = 0;
  public description: string;
  public guildOnly = false;
  public ownerOnly = false;
  public aliases: string[] = [];

  constructor(public client: Bot) {}

  public async exec(
    client: Client,
    message: Message,
    args: string[]
  ): Promise<Message | Array<Message> | void> {
    console.log('Message contents: ', message.content);
    console.log('Arguments: ', args);
  }
}
