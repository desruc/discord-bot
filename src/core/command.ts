import { Client, Message } from 'discord.js';
import Bot from './bot';

export interface CommandDefinition {
  active: boolean;
  name: string;
  category: string;
  description: string;
  aliases: string[];
  exec(
    client: Client,
    message: Message,
    args?: string[]
  ): Promise<Message | Array<Message> | void>;
}

export default class BotCommand implements CommandDefinition {
  public active = true;
  public name: string;
  public category: string;
  public description: string;
  public aliases: string[] = [];

  constructor(public client: Bot) {}

  public async exec(
    client: Client,
    message: Message,
    args: string[]
  ): Promise<Message | Array<Message> | void> {}
}
